package proj.travien.repository.Post;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;
import proj.travien.domain.Post;

@Repository
public class PostRepository {
    @PersistenceContext
    private EntityManager em;

    public void savePost(Post post) {
        em.persist(post);
    }

    public void deletePost(Post post) {
        em.remove(post);
    }

    public Post getPostById(Long postId) {
        return em.find(Post.class, postId);
    }

}
