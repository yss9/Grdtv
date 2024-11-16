package proj.travien.controller;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import proj.travien.domain.BookReview;
import proj.travien.domain.User;
import proj.travien.service.BookReviewService;
import proj.travien.service.UserService;

import java.util.List;


@RestController
@RequestMapping("/api/bookReviews")
public class BookReviewController {

    private final BookReviewService bookReviewService;
    private final UserService userService;

    public BookReviewController(BookReviewService bookReviewService, UserService userService) {
        this.bookReviewService = bookReviewService;
        this.userService = userService;
    }

    @PostMapping("/agent/{nickname}")
    public ResponseEntity<BookReview> addReview(@PathVariable String nickname,
                                                @RequestParam String content,
                                                @RequestParam int star) {

        User user = userService.getUserByNickname(nickname);
        BookReview bookReview = bookReviewService.addReviewByUser(user, content, star);
        return ResponseEntity.ok(bookReview);
    }


    /**
     * userId에 대한 리뷰만 확인할 수 있다
     */

    @GetMapping("/agent/{userId}")
    public ResponseEntity<List<BookReview>> getReviewsByUserId(@PathVariable Long userId) {
        List<BookReview> reviews = bookReviewService.getReviewsByUserId(userId);
        return ResponseEntity.ok(reviews);
    }

    /**
     * 리뷰 삭제하는 코드
     */
    @DeleteMapping("/{reviewId}")
    public ResponseEntity<Void> deleteReview(@PathVariable Long reviewId) {
        bookReviewService.deleteReview(reviewId);
        return ResponseEntity.noContent().build();
    }

    /**
     * 모든 리뷰 불러오는 코드
     */
    @GetMapping("/")
    public ResponseEntity<List<BookReview>> getAllReviews() {
        List<BookReview> reviews = bookReviewService.getAllReviews();
        return ResponseEntity.ok(reviews);
    }

    @GetMapping("/agent/review")
    public ResponseEntity<List<BookReview>> getReviewsByUsername(@RequestParam String nickname){
        Long id = userService.getIdByNickname(nickname);
        List<BookReview> reviews = bookReviewService.getReviewsByUserId(id);
        return ResponseEntity.ok(reviews);
    }
}

