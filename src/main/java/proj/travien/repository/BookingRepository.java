package proj.travien.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import proj.travien.domain.Booking;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

    // userId와 agentId로 Booking을 조회
    Optional<Booking> findByUser_UserIdAndAgent_UserId(String userId, String agentId);

    // 특정 userId가 관여된 모든 Booking을 조회
    List<Booking> findAllByUser_UserIdOrAgent_UserId(String userId, String agentId);
}
