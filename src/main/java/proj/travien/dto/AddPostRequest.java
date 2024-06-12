package proj.travien.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import proj.travien.domain.Post;

@NoArgsConstructor // 기본 생성자 추가
@AllArgsConstructor // 모든 필드 값을 파라미터러 받는 생성자 추가
@Getter
public class AddPostRequest {

    private Long postId; // postId 추가

    private String title;
    private String body;

    private String image;


    public Post toEntity(){
        return Post.builder()
                .title(title)
                .body(body)
                .build();
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Long getPostId() {
        return postId;
    }

    public void setPostId(Long postId) {
        this.postId = postId;
    }
}
