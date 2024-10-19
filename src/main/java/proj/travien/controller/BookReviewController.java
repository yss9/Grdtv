package proj.travien.controller;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import proj.travien.domain.BookReview;
import proj.travien.service.BookReviewService;
import java.util.List;


@RestController
@RequestMapping("/api/bookReviews")
public class BookReviewController {

    private final BookReviewService bookReviewService;

    public BookReviewController(BookReviewService bookReviewService) {
        this.bookReviewService = bookReviewService;
    }

    @PostMapping("/agent/{userId}")
    public ResponseEntity<BookReview> addReview(@PathVariable Long userId,
                                                @RequestParam String content,
                                                @RequestParam int star) {

        BookReview bookReview = bookReviewService.addReview(userId, content, star);
        return ResponseEntity.ok(bookReview);
    }

    @GetMapping("/agent/{userId}")
    public ResponseEntity<List<BookReview>> getReviewsByUserId(@PathVariable Long userId) {
        List<BookReview> reviews = bookReviewService.getReviewsByUserId(userId);
        return ResponseEntity.ok(reviews);
    }

    @DeleteMapping("/{reviewId}")
    public ResponseEntity<Void> deleteReview(@PathVariable Long reviewId) {
        bookReviewService.deleteReview(reviewId);
        return ResponseEntity.noContent().build();
    }
}

