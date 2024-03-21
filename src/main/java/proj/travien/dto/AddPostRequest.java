package proj.travien.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import proj.travien.domain.Post;

@NoArgsConstructor // 기본 생성자 추가
@AllArgsConstructor // 모든 필드 값을 파라미터러 받는 생성자 추가
@Getter
public class AddPostRequest {

    private String title;
    private String body;

    public Post toEntity(){
        return Post.builder()
                .title(title)
                .body(body)
                .build();
    }
}
