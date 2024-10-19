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

        // User의 닉네임은 user 객체에서 가져옵니다.
        BookReview bookReview = new BookReview(user, content, star);
        return bookReviewRepository.save(bookReview);  // repository 객체 사용 수정
    }

    public List<BookReview> getReviewsByUserId(Long userId) {
        return bookReviewRepository.findByUserId(userId);
    }

    public void deleteReview(Long reviewId) {
        bookReviewRepository.deleteById(reviewId);
    }
}
