package proj.travien.domain;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@NoArgsConstructor
@Getter
@Setter
@Entity
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long boardID;

    private String title;
    private String body;
    private String image;

    private String imageUrl; // 이미지 URL 필드 추가

    private String address;

    private LocalDateTime datetime; // datetime 필드 추가

    @OneToMany(mappedBy = "post", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private Set<Image> images = new HashSet<>();


    @OneToMany(mappedBy = "post", cascade = CascadeType.REMOVE)
    private Set<Like> likes = new HashSet<>();


    @OneToMany(mappedBy = "post",cascade = CascadeType.REMOVE)
    private Set<Favorite> favorites = new HashSet<>();

    private Integer likesCount;
    private Boolean verified;


    @Builder
    public Post(String title, String body, String image, String address) {
        this.title = title;
        this.body = body;
        this.image = image;
        this.address = address;

    }

    public void update(String title, String body, String image, String address) {
        this.title = title;
        this.body = body;
        this.image = image;
        this.address = address;
    }


}
