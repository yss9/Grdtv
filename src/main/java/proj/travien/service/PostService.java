package proj.travien.service;

import lombok.RequiredArgsConstructor;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import proj.travien.domain.Image;
import proj.travien.domain.Post;
import proj.travien.dto.AddPostRequest;
import proj.travien.dto.PostWithImagesRequest;
import proj.travien.dto.UpdatePostRequest;
import proj.travien.repository.ImageRepository;
import proj.travien.repository.PostRepository;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class PostService {

    private final PostRepository postRepository;
    private final ImageRepository imageRepository;

    @Transactional
    public Post save(Post request) {
        return postRepository.save(request.toEntity());
    }

    public List<Post> findAll() {
        return postRepository.findAll();
    }

    public Post findById(long id) {
        return postRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Post not found with id: " + id));
    }

    @Transactional
    public void delete(long id) {
        Post post = findById(id);
        postRepository.delete(post);
    }

    @Transactional
    public Post update(long id, UpdatePostRequest request) {
        Post post = findById(id);
        post.update(request.getTitle(), request.getBody());
        return post;
    }

    @Transactional
    public Post savePostWithImages(PostWithImagesRequest request) throws IOException {
        Post post = request.toEntity();
        postRepository.save(post);

        List<String> imageDatas = request.getImages().stream()
                .map(this::convertMultipartFileToBase64)
                .collect(Collectors.toList());
        for (String imageData : imageDatas) {
            Image image = new Image();
            image.setImageData(imageData.getBytes());
            image.setPost(post);
            imageRepository.save(image);
        }

        return post;
    }


    @Transactional
    public Post updatePostWithImages(long id, PostWithImagesRequest request) throws IOException {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Post not found with id: " + id));

        post.update(request.getTitle(), request.getBody());

        // Clear existing images
        post.getImages().clear();

        // Save new images
        List<String> imageDatas = request.getImages().stream()
                .map(this::convertMultipartFileToBase64)
                .collect(Collectors.toList());
        for (String imageData : imageDatas) {
            Image image = new Image();
            image.setImageData(imageData.getBytes());
            image.setPost(post);
            imageRepository.save(image);
        }

        return post;
    }


    private String convertMultipartFileToBase64(MultipartFile file) {
        try {
            return new String(file.getBytes());
        } catch (IOException e) {
            throw new RuntimeException("Failed to convert multipart file to Base64: " + e.getMessage());
        }
    }

    private List<String> saveImages(List<MultipartFile> images) throws IOException {
        return images.stream()
                .map(this::saveImage)
                .collect(Collectors.toList());
    }

    private String saveImage(MultipartFile image) {
        try {
            // 로그 추가
            System.out.println("Received file: " + image.getOriginalFilename());

            // 저장할 파일의 경로 설정
            String fileName = image.getOriginalFilename();
            // 저장할 파일의 경로 설정
            Path directoryPath = Paths.get("src/main/resources/static/images");

            Path filePath = directoryPath.resolve(fileName);

            // 디렉터리가 존재하지 않으면 생성
            if (Files.notExists(directoryPath)) {
                Files.createDirectories(directoryPath);
            }

            // 파일 저장
            byte[] bytes = image.getBytes();
            Files.write(filePath, bytes);

            System.out.println("File saved to: " + filePath.toString());
            return filePath.toString();
        } catch (IOException e) {
            e.printStackTrace();  // 에러 스택 트레이스 출력
            throw new RuntimeException("Failed to save image", e);
        }
    }

    private Image createImageEntity(String imageUrl) {
        Image image = new Image();
        image.setImageUrl(imageUrl);
        return imageRepository.save(image);
    }

    public List<String> findAllImages() {
        List<Post> allPosts = postRepository.findAll();
        List<String> allImages = allPosts.stream()
                .flatMap(post -> post.getImages().stream())
                .map(image -> image.getImageUrl())
                .collect(Collectors.toList());
        return allImages;
    }


    @CrossOrigin
    @GetMapping("/image")
    public ResponseEntity<?> returnImage(@RequestParam String imageName) {
        String path = "/Users/jinna-eun/Desktop/images/"; // Mac의 데스크탑에 있는 폴더 경로
        Resource resource = new FileSystemResource(path + imageName);
        return new ResponseEntity<>(resource, HttpStatus.OK);
    }


}
