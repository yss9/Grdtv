package proj.travien.dto;
import lombok.*;
import java.sql.Timestamp;


@Getter
@Setter
public class CommentResponse {

    private Long commentId;
    private String content;
    private String username;
    private Timestamp createDate;

    public CommentResponse(Long commentId, String content, String username, Timestamp createDate) {
        this.commentId = commentId;
        this.content = content;
        this.username = username;
        this.createDate = createDate;
    }

    // Getters and setters 생략
}
