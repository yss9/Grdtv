package proj.travien.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import proj.travien.domain.Post;
import proj.travien.dto.AddPostRequest;
import proj.travien.dto.PostResponse;
import proj.travien.service.PostService;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class PostController {

    private final PostService postService;

    @PostMapping("/api/posts")
    public ResponseEntity<Post> addPost(@RequestBody AddPostRequest request){
        Post savedPost = postService.save(request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(savedPost);
    }

    @GetMapping("/api/posts")
    public ResponseEntity<List<PostResponse>> findAllPosts(){
        List<PostResponse> posts = postService.findAll()
                .stream()
                .map(PostResponse::new)
                .toList();

        return ResponseEntity.ok()
                .body(posts);
    }
}
