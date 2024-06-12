package proj.travien.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import proj.travien.domain.Image;
import proj.travien.domain.Post;
import proj.travien.repository.ImageRepository;
import proj.travien.repository.PostRepository;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private ImageRepository imageRepository;

    private static final String UPLOAD_DIR = "src/main/resources/static/image/";


    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    public Optional<Post> getPostById(Long id) {
        Optional<Post> post = postRepository.findById(id);
        if (post.isPresent()) {
            Post fetchedPost = post.get();
            fetchedPost.setImageUrl("http://localhost:8000/api/posts/" + fetchedPost.getBoardID() + "/image");
            return Optional.of(fetchedPost);
        }
        return Optional.empty();
    }


    public Post createPost(MultipartFile image, String title, String body, String address) throws IOException {
        // 이미지 저장
        String fileName = image.getOriginalFilename();
        byte[] bytes = image.getBytes();
        Path path = Paths.get(UPLOAD_DIR + fileName);
        Files.write(path, bytes);

        // Post 객체 생성 및 저장
        Post post = new Post(title, body, path.toString(), address); // 이미지 파일의 경로를 저장
        post.setImageUrl("http://localhost:8000/api/posts/" + post.getBoardID() + "/image"); // 이미지 URL 설정
        return postRepository.save(post);
    }




    public Post updatePost(Long id, Post updatedPost) {
        return postRepository.findById(id)
                .map(post -> {
                    post.update(updatedPost.getTitle(), updatedPost.getBody(), updatedPost.getImage(), updatedPost.getAddress());
                    return postRepository.save(post);
                })
                .orElseThrow(() -> new RuntimeException("Post not found with id " + id));
    }

    public void deletePost(Long id) {
        postRepository.deleteById(id);
    }


}
