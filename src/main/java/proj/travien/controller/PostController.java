package proj.travien.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import proj.travien.domain.Post;
import proj.travien.dto.AddPostRequest;
import proj.travien.dto.PostResponse;
import proj.travien.dto.PostWithImagesRequest;
import proj.travien.dto.UpdatePostRequest;
import proj.travien.service.PostService;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import static jakarta.servlet.http.MappingMatch.PATH;

@RequiredArgsConstructor
@RestController
public class PostController {

    private final PostService postService;

    @PostMapping("/api/posts")
    public ResponseEntity<?> addPost(@ModelAttribute PostWithImagesRequest request) {
        try {
            Post savedPost = postService.savePostWithImages(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedPost.getId());
        } catch (IOException ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + ex.getMessage());
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + ex.getMessage());
        }
    }



    @GetMapping("/api/posts")
    public ResponseEntity<List<PostResponse>> findAllPosts() {
        List<PostResponse> posts = postService.findAll()
                .stream()
                .map(PostResponse::new)
                .collect(Collectors.toList());

        return ResponseEntity.ok().body(posts);
    }

    @GetMapping("/api/posts/{id}")
    public ResponseEntity<PostResponse> findPost(@PathVariable long id) {
        Post post = postService.findById(id);
        return ResponseEntity.ok().body(new PostResponse(post));
    }

    @GetMapping("/api/posts/images")
    public ResponseEntity<List<String>> findAllImages() {
        List<String> allImages = postService.findAllImages();
        return ResponseEntity.ok().body(allImages);
    }

    @DeleteMapping("/api/posts/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable long id) {
        postService.delete(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/api/posts/{id}")
    public ResponseEntity<PostResponse> updatePost(@PathVariable long id, @ModelAttribute PostWithImagesRequest request) {
        try {
            Post updatedPost = postService.updatePostWithImages(id, request);
            return ResponseEntity.ok().body(new PostResponse(updatedPost));
        } catch (IOException ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    private final String IMAGE_UPLOAD_PATH = "/Users/jinna-eun/Desktop/images/";

    private final String imagePath = "/Users/jinna-eun/Desktop/images/"; // 이미지가 저장된 경로

    @PostMapping("/post")
    public ResponseEntity<Long> fileUpload(@RequestParam MultipartFile file,
                                           @RequestParam("post") String stringPost) {
        try {
            //stringPost의 값 {title: "...", contents: "..."}을 Post 객체로 매핑합니다.
            Post post = new ObjectMapper().readValue(stringPost, Post.class);

            // 게시물을 저장하고 게시물의 ID를 얻어옵니다.
            Post savedPost = postService.save(post);
            Long postId = savedPost.getId();

            // 이미지 파일을 저장합니다.
            String imageFileName = postId + "_" + file.getOriginalFilename();
            Path imageFilePath = Paths.get(IMAGE_UPLOAD_PATH + imageFileName);
            Files.write(imageFilePath, file.getBytes());

            // 이미지 파일 이름을 게시물에 설정합니다.
            savedPost.setImage(imageFileName);
            // 게시물을 다시 저장합니다. 이미지 파일 이름을 갱신하기 위해 저장이 필요합니다.
            postService.save(savedPost);

            return new ResponseEntity<>(postId, HttpStatus.CREATED);
        } catch (Exception e) {
            // 예외 발생 시 오류 응답을 반환합니다.
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



    // 파일 확장자를 반환하는 메서드
    private String getFileExtension(String fileName) {
        return fileName.substring(fileName.lastIndexOf("."));
    }

    @GetMapping("/image/{postId}")
    public ResponseEntity<byte[]> getImageByPostId(@PathVariable Long postId) {
        try {
            // postId와 연관된 이미지 파일을 찾습니다.
            String imageFileName = postId + "_"; // 이미지 파일 이름은 postId로 시작하는 것으로 가정합니다.
            Path imagePath = findImageByFileName(imageFileName);

            if (imagePath != null) {
                // 이미지 파일이 존재하면 해당 이미지 파일을 읽어와서 바이트 배열로 변환하여 반환합니다.
                byte[] imageBytes = Files.readAllBytes(imagePath);
                return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(imageBytes);
            } else {
                // 이미지 파일이 존재하지 않으면 Not Found 응답을 반환합니다.
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (IOException e) {
            // 파일을 읽을 수 없는 경우 Internal Server Error 응답을 반환합니다.
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }




    // 이미지 파일을 찾는 메서드
    private Path findImageByFileName(String fileName) throws IOException {
        return Files.walk(Paths.get(IMAGE_UPLOAD_PATH))
                .filter(path -> path.getFileName().toString().startsWith(fileName))
                .findFirst()
                .orElse(null);
    }
}







