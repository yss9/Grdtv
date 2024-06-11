package proj.travien.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import proj.travien.domain.Place;

public interface PlaceRepository extends JpaRepository<Place, Long> {
}
