package proj.travien.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
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
import java.util.List;
import java.util.stream.Collectors;

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

}
