package proj.travien.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import proj.travien.domain.Like;
import proj.travien.domain.Post;
import proj.travien.domain.User;
import proj.travien.repository.LikeRepository;
import proj.travien.repository.PostRepository;

import java.util.List;
import java.util.Optional;

@Service
public class LikeService {
    @Autowired
    private LikeRepository likeRepository;

    @Autowired
    private PostRepository postRepository;

    public void toggleLikePost(Long boardID, Long id) {
        Post post = postRepository.findById(boardID).orElseThrow(() -> new IllegalArgumentException("게시물을 찾을 수 없습니다."));
        Optional<Like> existingLike = likeRepository.findByPostBoardIDAndUserId(boardID, id);

        if (existingLike.isPresent()) {
            // 이미 좋아요가 되어 있으면 좋아요 취소
            likeRepository.delete(existingLike.get());
            post.removeLike(); // 좋아요 수 감소
        } else {
            // 좋아요가 없으면 좋아요 추가
            Like like = new Like();
            like.setPost(post);
            like.setUser(new User(id)); // User는 이미 존재하는 엔티티로 가정
            likeRepository.save(like);

            post.addLike(); // 좋아요 수 증가
        }

        postRepository.save(post); // 게시물 업데이트
    }

    public boolean isPostLikedByUser(Long boardID, Long id) {
        return likeRepository.existsByPostBoardIDAndUserId(boardID, id);
    }

    public List<Post> getTop3BestPosts() {
        return postRepository.findTop3ByOrderByLikesCountDesc();
    }

    public List<Post> getTopBestPosts() {
        // 좋아요 수가 0보다 큰 게시물만 가져옴, 좋아요 수 동일할 경우 boardID로 정렬
        List<Post> posts = postRepository.findAllByLikesAndBoardID();

        // 게시물이 3개 미만일 경우 있는 만큼만 반환
        if (posts.size() <= 3) {
            return posts;
        }

        // 상위 3개의 게시물만 반환
        return posts.subList(0, 3);
    }


}

