package proj.travien.dto;

import lombok.Getter;
import proj.travien.domain.Post;


@Getter
public class PostResponse {

    private final String title;
    private final String body;

    public PostResponse(Post post){
        this.title = post.getTitle();
        this.body = post.getBody();
    }
}
