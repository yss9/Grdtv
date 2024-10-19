package proj.travien.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import proj.travien.domain.MyRoute;

import java.util.List;

public interface MyRouteRepository extends JpaRepository<MyRoute, Long> {

    List<MyRoute> findAllByUserId(Long id);

}
