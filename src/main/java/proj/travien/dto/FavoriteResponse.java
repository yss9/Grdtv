package proj.travien.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import proj.travien.domain.Favorite;

@NoArgsConstructor
@Getter
@Setter
public class FavoriteResponse {

    private Long id;
    private Long postId;

    public FavoriteResponse(Favorite favorite) {
        this.id = favorite.getId();
        this.postId = favorite.getPost().getId();
    }
}
