package proj.travien.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import proj.travien.domain.Addresses;
import proj.travien.domain.Post;
import proj.travien.domain.User;
import proj.travien.dto.AddressResponseDto;
import proj.travien.service.PostService;
import proj.travien.service.UserService;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/posts")
@CrossOrigin(origins = "http://localhost:3000")
public class PostController {

    @Autowired
    private PostService postService;
    @Autowired
    private UserService userService;  // 새로 추가된 UserService


    private static final String UPLOAD_DIR = "src/main/resources/static/image/";

   /* @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            // 파일 저장
            String fileName = file.getOriginalFilename();
            byte[] bytes = file.getBytes();
            Path path = Paths.get(UPLOAD_DIR + fileName);
            Files.write(path, bytes);
            return ResponseEntity.ok().body("File uploaded successfully: " + fileName);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload file: " + e.getMessage());
        }
    }*/

    @PostMapping("/upload")
    public String uploadImage(@RequestParam("image") MultipartFile file) {
        if (file.isEmpty()) {
            return "파일이 없습니다.";
        }

        try {
            byte[] bytes = file.getBytes();
            Path path = Paths.get(UPLOAD_DIR + file.getOriginalFilename());
            Files.write(path, bytes);

            // 서버에 저장된 파일의 접근 경로를 반환
            return "/image/" + file.getOriginalFilename();
        } catch (IOException e) {
            e.printStackTrace();
            return "파일 업로드 실패";
        }
    }



    /**
     * 게시물 업로드
     */
    @PostMapping("/")
    public ResponseEntity<Post> createPost(@RequestParam("title") String title,
                                           @RequestParam("body") String body,
                                           @RequestParam("addresses") Set<String> addresses,
                                           @RequestParam("addressTitle") String addressTitle,
                                           @RequestParam("country") String country,
                                           @RequestParam("userId") String userId) {

        // 사용자 조회 로직 추가
        User user = userService.findByUserId(userId);  // 사용자 정보를 UserService에서 조회

        if (user == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();  // 사용자 없는 경우 처리
        }

        // 게시물 생성 로직 (기존 코드 유지)
        Set<Addresses> addressEntities = addresses.stream()
                .map(address -> Addresses.builder().address(address).build())
                .collect(Collectors.toSet());

        Post createdPost = postService.createPost(title, body, addressEntities, addressTitle, country);

        // 포인트 업데이트 추가
        user.setPoints(user.getPoints() + 10);  // 사용자 포인트 +10
        userService.save(user);  // 사용자 정보 업데이트

        return ResponseEntity.status(HttpStatus.CREATED).body(createdPost);  // 생성된 게시물 응답
    }


    /**
     * 루트 추천 (특정 placename에 맞는 포스트 검색)
     */
    @GetMapping("/addresses/{placename}")
    public ResponseEntity<List<AddressResponseDto>> getPostAddressesByPlaceName(@PathVariable String placename) {
        try {
            List<AddressResponseDto> addressResponses = postService.getPostAddressesByPlaceName(placename);
            return ResponseEntity.ok(addressResponses);
        } catch (IllegalStateException e) {
            // '추천되는 게시물 없음' 예외 처리
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Collections.emptyList());
        }
    }



    /**
     * 특정 게시물 가져오기
     */
    @GetMapping("/{id}/")
    public ResponseEntity<Post> getPostById(@PathVariable Long id) {
        Optional<Post> post = postService.getPostById(id);
        return post.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }



    /**
     * 게시물 전체 가져오기
     */
    @GetMapping("/")
    public List<Post> getAllPosts() {
        return postService.getAllPosts();
    }



    @PutMapping("/{id}/")
    public ResponseEntity<Post> updatePost(@PathVariable Long id, @RequestBody Post updatedPost) {
        try {
            Post post = postService.updatePost(id, updatedPost);
            return ResponseEntity.ok(post);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }


    @DeleteMapping("/{id}/")
    public ResponseEntity<Void> deletePost(@PathVariable Long id) {
        postService.deletePost(id);
        return ResponseEntity.noContent().build();
    }


    @PostMapping("/{id}/report/")
    public ResponseEntity<Void> reportPost(@PathVariable Long id) {
        // Implement your report logic here
        return ResponseEntity.ok().build();
    }



    @GetMapping("/{id}/image")
    public ResponseEntity<byte[]> getImage(@PathVariable Long id) {
        // 게시물 ID를 기반으로 해당 게시물의 이미지 URL을 가져옴
        Optional<Post> postOptional = postService.getPostById(id);

        // 게시물이 존재하는지 확인
        if (postOptional.isPresent()) {
            Post post = postOptional.get();

            try {
                // 이미지 파일의 경로를 가져옴
                Path imagePath = Paths.get(post.getImageUrl());

                // 이미지 파일을 바이트 배열로 읽어들임
                byte[] imageData = Files.readAllBytes(imagePath);

                // 이미지 데이터를 응답에 실어 반환
                return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(imageData);
            } catch (IOException e) {
                // 이미지 파일을 읽어오는 도중 오류가 발생한 경우
                e.printStackTrace();
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
            }
        } else {
            // 해당 ID에 해당하는 게시물이 없는 경우
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * 썸네일 저장 API
     */
    @PostMapping("/{boardID}/thumbnail")
    public ResponseEntity<String> saveThumbnail(@PathVariable Long boardID) {
        postService.saveThumbnail(boardID);
        return ResponseEntity.ok("썸네일 저장 완료");
    }

    /**
     * 썸네일 반환
     */
    @GetMapping("/{boardID}/thumbnail")
    public ResponseEntity<String> getThumbnail(@PathVariable Long boardID) {
        // PostService를 통해 해당 게시물의 썸네일 URL을 가져옴
        String thumbnailUrl = postService.getThumbnail(boardID);
        if (thumbnailUrl != null) {
            return ResponseEntity.ok(thumbnailUrl);
        } else {
            return ResponseEntity.notFound().build();  // 썸네일이 없으면 404 반환
        }
    }




}
