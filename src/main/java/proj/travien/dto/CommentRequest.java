package proj.travien.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommentRequest {
    private Long boardID;  // 게시판 ID
    private Long userId;   // 사용자 ID
    private String content; // 댓글 내용
}
