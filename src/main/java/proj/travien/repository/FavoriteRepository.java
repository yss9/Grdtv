package proj.travien.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import proj.travien.domain.Favorite;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
}
