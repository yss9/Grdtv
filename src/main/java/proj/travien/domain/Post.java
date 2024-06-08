package proj.travien.domain;

import jakarta.persistence.*;

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
    private Long id;

    private String title;
    private String body;

    @OneToMany(mappedBy = "post", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private Set<Image> images = new HashSet<>();


    @OneToMany(mappedBy = "post", cascade = CascadeType.REMOVE)
    private Set<Like> likes = new HashSet<>();


    private Integer likesCount;
    private Boolean verified;

    @Builder    // 빌더 패턴으로 객체 생성
    public Post(String title, String body){
        this.title = title;
        this.body = body;
    }

    public void update(String title, String body){
        this.title = title;
        this.body = body;
    }
}
