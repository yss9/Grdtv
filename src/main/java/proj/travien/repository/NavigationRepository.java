package proj.travien.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import proj.travien.domain.Navigation;

public interface NavigationRepository extends JpaRepository<Navigation, Long> {
}
