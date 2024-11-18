package proj.travien.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import proj.travien.domain.Post;
import proj.travien.repository.PostRepository;
import proj.travien.service.CommentService;
import proj.travien.service.LikeService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/likes")
public class LikeController {

    @Autowired
    private LikeService likeService;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private CommentService commentService;


    /**
     * 좋아요 토글
     */
    @PostMapping("/toggle")
    public ResponseEntity<?> toggleLike(@RequestParam Long boardID, @RequestParam Long id) {
        // 좋아요 토글 처리
        likeService.toggleLikePost(boardID, id);

        // 현재 게시물의 좋아요 상태 확인
        boolean isLiked = likeService.isPostLikedByUser(boardID, id);
        int likesCount = postRepository.findById(boardID).get().getLikesCount();

        // 응답 데이터 준비
        Map<String, Object> response = new HashMap<>();
        response.put("isLiked", isLiked);  // 좋아요 여부
        response.put("likesCount", likesCount);  // 좋아요 수

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{boardID}/is-liked")
    public ResponseEntity<?> isLikedByUser(@PathVariable Long boardID, @RequestParam Long id) {
        boolean isLiked = likeService.isPostLikedByUser(boardID, id);  // 유저가 좋아요를 눌렀는지 확인
        int likesCount = postRepository.findById(boardID).get().getLikesCount();  // 게시물의 좋아요 수 가져오기

        // 응답 데이터 구성
        Map<String, Object> response = new HashMap<>();
        response.put("isLiked", isLiked);  // 유저의 좋아요 여부
        response.put("likesCount", likesCount);  // 좋아요 수

        return ResponseEntity.ok(response);  // 응답 반환
    }



    /**
     * 게시물의 총 좋아요 수를 반환
     */
    @GetMapping("/{boardID}/count")
    public ResponseEntity<?> getLikesCount(@PathVariable Long boardID) {
        // 게시물 조회
        Post post = postRepository.findById(boardID)
                .orElseThrow(() -> new IllegalArgumentException("게시물을 찾을 수 없습니다."));

        // 좋아요 수가 null인 경우 0을 반환
        int likesCount = post.getLikesCount() != null ? post.getLikesCount() : 0;

        // 응답 데이터 준비
        Map<String, Object> response = new HashMap<>();
        response.put("likesCount", likesCount);  // 좋아요 수

        return ResponseEntity.ok(response);
    }

    /**
     * 베스트 리뷰
     */
    @GetMapping("/best-reviews")
    public ResponseEntity<?> getBestReviews() {
        List<Post> bestPosts = likeService.getTopBestPosts();

        if (bestPosts.isEmpty()) {
            return ResponseEntity.ok("No posts with likes.");
        }

        List<Map<String, Object>> bestPostsWithCommentCount = bestPosts.stream().map(post -> {
            Map<String, Object> postDetails = new HashMap<>();
            postDetails.put("post", post);
            postDetails.put("commentCount", commentService.getCommentCountByBoardID(post.getBoardID()));
            return postDetails;
        }).collect(Collectors.toList());

        Map<String, Object> response = new HashMap<>();
        response.put("bestPosts", bestPostsWithCommentCount);

        return ResponseEntity.ok(response);
    }


    /**
     * 특정 사용자가 좋아요한 게시물 목록
     */
    @GetMapping("/user/{id}")
    public ResponseEntity<List<Post>> getLikedPostsByUser(@PathVariable Long id) {
        List<Post> likedPosts = likeService.getLikedPostsByUser(id);
        if (likedPosts.isEmpty()) {
            return ResponseEntity.noContent().build();  // 좋아요한 게시물이 없을 경우 204 응답
        }
        return ResponseEntity.ok(likedPosts);  // 좋아요한 게시물 목록 반환
    }

}
