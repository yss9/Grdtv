package proj.travien.dto;

import lombok.Getter;
import proj.travien.domain.Post;

import java.util.List;
import java.util.stream.Collectors;

@Getter
public class PostResponse {
    private Long id;
    private String title;
    private String body;
    private List<String> imageUrls;

    public PostResponse(Post post) {
        this.id = post.getBoardID();
        this.title = post.getTitle();
        this.body = post.getBody();
        this.imageUrls = post.getImages().stream()
                .map(image -> image.getImageUrl())
                .collect(Collectors.toList());
    }


}
