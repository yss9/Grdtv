package proj.travien.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import proj.travien.domain.Post;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByCountry(String country);

    @Query("SELECT p FROM Post p WHERE p.title LIKE %:keyword% OR p.body LIKE %:keyword% OR p.AddressTitle LIKE %:keyword%")
    List<Post> findByKeyword(String keyword);
}
