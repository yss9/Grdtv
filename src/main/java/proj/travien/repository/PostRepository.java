package proj.travien.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import proj.travien.domain.Post;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByCountry(String country);

    @Query("SELECT p FROM Post p WHERE p.title LIKE %:keyword% OR p.body LIKE %:keyword% OR p.AddressTitle LIKE %:keyword%")
    List<Post> findByKeyword(String keyword);

    @Query("SELECT p FROM Post p ORDER BY p.likesCount DESC")
    List<Post> findTop3ByOrderByLikesCountDesc();

    // 좋아요 수가 동일한 경우 boardID 순으로 정렬하고, 좋아요 수가 0보다 큰 게시물만 가져옴
    @Query("SELECT p FROM Post p WHERE p.likesCount > 0 ORDER BY p.likesCount DESC, p.boardID ASC")
    List<Post> findAllByLikesAndBoardID();

    @Query("SELECT p FROM Post p WHERE p.nickname = :nickname")
    List<Post> findByNickname(String nickname);

    List<Post> findByTitleContaining(String placeName);
}
