package proj.travien.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import proj.travien.domain.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmailAndPassword(String email, String password);
}
