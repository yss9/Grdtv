package proj.travien.service.Post;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import proj.travien.domain.Post;
import proj.travien.dto.Post.PostForm;
import proj.travien.repository.Post.PostRepository;

@Service
@Transactional
public class PostService {

    @Autowired
    PostRepository postRepository;

    public PostService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    public void createPost(PostForm postForm) {
        Post post = new Post();


        post.setTitle(postForm.getTitle());
        post.setBody(postForm.getBody());
        postRepository.savePost(post);
    }

    public Post getPost(Long postId) {
        return postRepository.getPostById(postId);
    }

    public void removePostById(Long postId) {
        Post post = postRepository.getPostById(postId);
        postRepository.deletePost(post);
    }

    public void updatePost(Long postId, PostForm postDto) {
        Post post = postRepository.getPostById(postId);
        post.setTitle(postDto.getTitle());
        post.setBody(postDto.getBody());

        postRepository.savePost(post);
    }
}
