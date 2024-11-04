package proj.travien.repository;

import org.springframework.data.domain.Pageable;
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

    // 최근에 예약대행자로 승인된 사용자 8명을 가져오는 쿼리
    List<User> findByIsAgentTrueOrderByAgentApprovedDateDesc(Pageable pageable);
}
