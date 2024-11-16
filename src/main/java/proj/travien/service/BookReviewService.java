package proj.travien.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import proj.travien.domain.BookReview;
import proj.travien.domain.User;
import proj.travien.repository.BookReviewRepository;
import proj.travien.repository.UserRepository;

import java.util.List;

@Service
@Transactional
public class BookReviewService {

    private final BookReviewRepository bookReviewRepository;
    private final UserRepository userRepository;

    public BookReviewService(BookReviewRepository bookReviewRepository, UserRepository userRepository) {
        this.bookReviewRepository = bookReviewRepository;
        this.userRepository = userRepository;
    }

    public BookReview addReview(Long userId, String content, int star) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        // 리뷰 추가
        BookReview bookReview = new BookReview(user, content, star);
        bookReviewRepository.save(bookReview);

        // 리뷰 수 및 평균 별점 계산
        updateUserAverageStar(user);

        return bookReview;
    }

    public List<BookReview> getReviewsByUserId(Long userId) {
        return bookReviewRepository.findByUserId(userId);
    }

    public void deleteReview(Long reviewId) {
        BookReview review = bookReviewRepository.findById(reviewId)
                .orElseThrow(() -> new IllegalArgumentException("Review not found"));
        User user = review.getUser();

        // 리뷰 삭제
        bookReviewRepository.deleteById(reviewId);

        // 평균 별점 업데이트
        updateUserAverageStar(user);
    }

    // 모든 리뷰를 반환하는 메서드 추가
    public List<BookReview> getAllReviews() {
        return bookReviewRepository.findAll();
    }

    // 평균 별점 업데이트 메서드
    private void updateUserAverageStar(User user) {
        List<BookReview> userReviews = bookReviewRepository.findByUserId(user.getId());

        if (!userReviews.isEmpty()) {
            double averageStar = userReviews.stream()
                    .mapToInt(BookReview::getStar)
                    .average()
                    .orElse(0.0);

            // 소수점 둘째 자리까지 반올림
            double roundedAverageStar = Math.round(averageStar * 100.0) / 100.0;
            user.setAverageReviewRating(roundedAverageStar);
        } else {
            user.setAverageReviewRating(0.0); // 리뷰가 없으면 평균 별점을 0으로 설정
        }

        // 사용자 업데이트 (persist)
        userRepository.save(user);
    }
}
