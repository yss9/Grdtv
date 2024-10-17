package proj.travien.service;


import proj.travien.domain.Comment;
import proj.travien.domain.Post;
import proj.travien.domain.User;
import proj.travien.dto.CommentResponse;
import proj.travien.repository.CommentRepository;
import proj.travien.repository.PostRepository;
import proj.travien.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;


    /**
     * 댓글 작성 메서드
     */
    public Comment addComment(Long boardID, Long userId, String content) {
        Post post = postRepository.findById(boardID).orElseThrow(() -> new RuntimeException("Post not found"));
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        Comment comment = Comment.builder()
                .post(post)
                .user(user)
                .content(content)
                .build();

        return commentRepository.save(comment);
    }


    /**
     * 댓글 정보 가져오기 메서드
     */
    public Comment getComment(Long commentId) {
        return commentRepository.findById(commentId)
                .orElseThrow(() -> new RuntimeException("Comment not found"));
    }


    public List<CommentResponse> getCommentsByBoardID(Long boardID) {
        Post post = postRepository.findById(boardID)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        return commentRepository.findByPost(post).stream()
                .map(comment -> new CommentResponse(
                        comment.getContent(),
                        comment.getUser().getNickname(),
                        comment.getCreateDate()
                ))
                .collect(Collectors.toList());
    }

}

