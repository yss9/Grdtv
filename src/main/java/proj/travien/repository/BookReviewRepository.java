package proj.travien.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import proj.travien.domain.BookReview;

import java.util.List;

public interface BookReviewRepository extends JpaRepository<BookReview, Long>  {
    List<BookReview> findByUserId(Long userId);

}
