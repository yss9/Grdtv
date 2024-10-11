package proj.travien.controller;

import org.springframework.http.HttpStatus;
import proj.travien.domain.Comment;
import proj.travien.dto.CommentRequest;
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

    // 댓글 작성 엔드포인트
    // Controller 메서드
    @PostMapping("/")
    public ResponseEntity<Comment> createComment(@RequestBody CommentRequest commentRequest) {
        Long postId = commentRequest.getBoardID(); // 필요한 경우 boardID에서 postId를 가져오기
        Long userId = commentRequest.getUserId();
        String content = commentRequest.getContent();

        Comment createdComment = commentService.addComment(postId, userId, content);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdComment);
    }

}
