package proj.travien.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import proj.travien.domain.Like;

import java.util.List;
import java.util.Optional;

@Repository
public interface LikeRepository extends JpaRepository<Like, Long> {


    boolean existsByPostBoardIDAndUserId(Long boardID, Long userId);


    Optional<Like> findByPostBoardIDAndUserId(Long boardID, Long userId);


    // 최근 10명의 닉네임을 가져오는 메서드
    @Query("SELECT u.nickname FROM Like l JOIN l.user u WHERE l.post.boardID = :postId ORDER BY l.id DESC")
    List<String> findRecentUsernamesByPostId(@Param("postId") Long postId);

}
