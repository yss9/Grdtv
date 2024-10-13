package proj.travien.controller;

import org.springframework.http.HttpStatus;
import proj.travien.domain.Comment;
import proj.travien.dto.CommentRequest;
import proj.travien.dto.CommentResponse;
import proj.travien.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    @Autowired
    private CommentService commentService;

    /**
     * 댓글 작성
     */
    @PostMapping("/")
    public ResponseEntity<Comment> createComment(@RequestBody CommentRequest commentRequest) {
        Long boardID = commentRequest.getBoardID(); // 필요한 경우 boardID에서 postId를 가져오기
        Long userId = commentRequest.getUserId();
        String content = commentRequest.getContent();

        Comment createdComment = commentService.addComment(boardID, userId, content);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdComment);
    }

    /**
     * 게시물 댓글 목록 확인
     */
    @GetMapping("/{boardID}")
    public ResponseEntity<List<CommentResponse>> getCommentsByBoardID(@PathVariable Long boardID) {
        List<CommentResponse> comments = commentService.getCommentsByBoardID(boardID);
        return ResponseEntity.ok(comments);
    }


}
