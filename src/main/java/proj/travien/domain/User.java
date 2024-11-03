package proj.travien.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
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

    // 단일 역할 관리 (Enum 타입)
    @Enumerated(EnumType.STRING)
    private Role role;

    //나은이가 추가
    // 기본 생성자 추가
    public User() {
    }

    // ID를 사용하는 생성자 (선택 사항)
    public User(Long id) {
        this.id = id;
    }

    // 예약대행자 승인 시점을 기록할 필드
    @Getter
    @Setter
    private LocalDateTime agentApprovedDate;
}


