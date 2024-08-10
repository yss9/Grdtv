package proj.travien.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import proj.travien.domain.Follow;
import proj.travien.domain.User;

import java.util.List;

public interface FollowRepository extends JpaRepository<Follow, Long> {
    List<Follow> findByUser(User user);
    boolean existsByUserAndAgent(User user, User agent);
}
