package proj.travien.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userId;
    private String password;
    private String name;
    private String dateOfBirth;
    private String gender;
    private String mbti;
    private String profilePicture;
    private String nickname;
    private int points;

    private boolean isAgent;
    private String verificationFile;
    private String agentCountry;

    @Lob
    private String introduction;

    @ElementCollection
    private List<String> hashtags;

    private String specIntroduction;
    private double averageReviewRating;

    // 역할 필드 (ROLE_USER, ROLE_AGENT, ROLE_ADMIN 등)
    @ElementCollection(fetch = FetchType.EAGER)
    private Set<String> roles;

    //나은이가 추가
    // 기본 생성자 추가
    public User() {
    }

    // ID를 사용하는 생성자 (선택 사항)
    public User(Long id) {
        this.id = id;
    }



}

