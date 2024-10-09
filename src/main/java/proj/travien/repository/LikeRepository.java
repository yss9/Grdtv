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


    boolean existsByPostBoardIDAndUserId(Long boardID, Long id);


    Optional<Like> findByPostBoardIDAndUserId(Long boardID, Long id);



}
