package proj.travien.domain;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
@Getter
@Setter
@Entity
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long boardID;

    private String title;
    @Lob
    private String body;

    @ColumnDefault("0")
    private int count;  // 조회수
    private String image;

    private String imageUrl; // 이미지 URL 필드 추가

    @CreationTimestamp
    private Timestamp createDate; // datetime 필드 추가

    private String AddressTitle;  //주소 이름 필드

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference // 순환 참조 방지
    private Set<Addresses> addresses = new HashSet<>();

    @OneToMany(mappedBy = "post", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private Set<Image> images = new HashSet<>();

    @OneToMany(mappedBy = "post", cascade = CascadeType.REMOVE)
    private Set<Like> likes = new HashSet<>();

    @OneToMany(mappedBy = "post", cascade = CascadeType.REMOVE)
    private Set<Favorite> favorites = new HashSet<>();

    private Integer likesCount;
    private Boolean verified;

    @Builder
    public Post(String title, Set<Addresses> addresses) {
        this.title = title;
        this.addresses = addresses;
    }

    public void update(String title, String body, String image, Set<Addresses> addresses) {
        this.title = title;
        this.body = body;
        this.image = image;
        this.addresses = addresses;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Post post = (Post) o;
        return boardID != null && boardID.equals(post.boardID);
    }

    @Override
    public int hashCode() {
        return 31;
    }
}
