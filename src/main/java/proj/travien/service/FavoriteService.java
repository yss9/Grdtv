package proj.travien.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import proj.travien.domain.Favorite;
import proj.travien.domain.Post;
import proj.travien.repository.FavoriteRepository;
import proj.travien.repository.PostRepository;

import java.util.List;

@RequiredArgsConstructor
@Service
public class FavoriteService {

    private final FavoriteRepository favoriteRepository;
    private final PostRepository postRepository;

    public void addFavorite(Long postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("Post not found with id: " + postId));

        Favorite favorite = new Favorite();
        favorite.setPost(post);

        favoriteRepository.save(favorite);
    }

    public List<Favorite> getAllFavorites() {
        return favoriteRepository.findAll();
    }


    public void removeFavorite(Long favoriteId) {
        favoriteRepository.deleteById(favoriteId);
    }
}
