package proj.travien.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import proj.travien.domain.DestinationInfo;

public interface DestinationInfoRepository extends JpaRepository<DestinationInfo, Long> {
}
