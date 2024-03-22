package proj.travien.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import proj.travien.domain.Post;
import proj.travien.dto.AddPostRequest;
import proj.travien.dto.UpdatePostRequest;
import proj.travien.repository.PostRepository;

import java.util.List;

@RequiredArgsConstructor  // final 이 붙거나 @NotNull 이 붙은 필드의 생성자 추가
@Service
public class PostService {

    private final PostRepository postRepository;

    // 게시물 글 추가 메서드
    public Post save(AddPostRequest request){
        return postRepository.save(request.toEntity());
    }

    // 게시글 글 목록 조회
    public List<Post> findAll(){
        return postRepository.findAll();
    }

    // 게시글 글 조회
    public Post findById(long id){
            return postRepository.findById(id)
                    .orElseThrow(() -> new IllegalArgumentException("not found:" + id));
    }

    // 게시글 글 삭제
    public void delete(long id){
        postRepository.deleteById(id);
    }

    @Transactional
    public Post update(long id, UpdatePostRequest request){
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("not found: " + id));

        post.update(request.getTitle(), request.getBody());

        return post;
    }
}
