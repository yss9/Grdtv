package proj.travien.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import proj.travien.domain.Image;

public interface ImageRepository extends JpaRepository<Image, Long> {
}
