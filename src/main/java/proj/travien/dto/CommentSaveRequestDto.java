package proj.travien.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommentSaveRequestDto {
    private int userId;
    private int boardId;
    private String content;

}
