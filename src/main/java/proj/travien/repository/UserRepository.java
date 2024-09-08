package proj.travien.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import proj.travien.domain.User;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByNickname(String nickname);
    Optional<User> findByUserId(String userId);

    // 에이전트 목록 조회
    List<User> findByIsAgentTrue();

    // 특정 국가의 에이전트 목록 조회
    List<User> findByIsAgentTrueAndAgentCountry(String country);
}
