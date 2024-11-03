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
    @Column(columnDefinition = "LONGTEXT")
    private String body;

    private String image;

    private String imageUrl;

    @CreationTimestamp
    private Timestamp createDate;

    private String AddressTitle;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private Set<Addresses> addresses = new HashSet<>();

    @OneToMany(mappedBy = "post", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private Set<Image> images = new HashSet<>();

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private Set<Like> likes = new HashSet<>();

    private Integer likesCount;

    private Boolean verified;

    private String country;

    @Builder
    public Post(String title, String body, Set<Addresses> addresses, String country, String nickname, String mbti, String profilePicture) {
        this.title = title;
        this.body = body;
        this.addresses = addresses;
        this.country = country;
        this.nickname = nickname;
        this.mbti = mbti;
        this.profilePicture = profilePicture;
    }

    public void update(String title, String body, Set<Addresses> addresses, String country, String nickname, String mbti, String profilePicture) {
        this.title = title;
        this.body = body;
        this.addresses = addresses;
        this.country = country;
        this.nickname = nickname;
        this.mbti = mbti;
        this.profilePicture = profilePicture;
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

    public void addLike() {
        this.likesCount = this.likesCount == null ? 1 : this.likesCount + 1;
    }

    public void removeLike() {
        if (this.likesCount != null && this.likesCount > 0) {
            this.likesCount--;
        }
    }


    public Set<Long> getLikeUserIds() {
        Set<Long> userIds = new HashSet<>();
        for (Like like : likes) {
            userIds.add(like.getUser().getId());
        }
        return userIds;
    }

    @Column
    private String thumbnail;

    /**
     * User 정보 domain
     */
    private String nickname;
    private String mbti;

    private String profilePicture;



}
