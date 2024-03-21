package proj.travien.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import proj.travien.domain.Post;
import proj.travien.dto.AddPostRequest;
import proj.travien.repository.PostRepository;

@RequiredArgsConstructor  // final 이 붙거나 @NotNull 이 붙은 필드의 생성자 추가
@Service
public class PostService {

    private final PostRepository postRepository;

    // 게시물 글 추가 메서드
    public Post save(AddPostRequest request){
        return postRepository.save(request.toEntity());
    }
}
