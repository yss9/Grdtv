package proj.travien.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import proj.travien.domain.Post;

public interface PostRepository extends JpaRepository<Post, Long> {
}
