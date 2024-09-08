package proj.travien.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import proj.travien.domain.PointsHistory;

public interface PointsHistoryRepository extends JpaRepository<PointsHistory, Long> {
}
