package proj.travien.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;
import proj.travien.domain.Post;

import java.util.List;

@Getter
@Setter
public class PostWithImagesRequest {
    private String title;
    private String body;
    private List<MultipartFile> images;

    public Post toEntity() {
        return Post.builder()
                .title(title)
                .body(body)
                .build();
    }
}
