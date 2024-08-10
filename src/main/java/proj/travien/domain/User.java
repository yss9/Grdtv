package proj.travien.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

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


    private boolean isAgent;
    private String verificationFile;
    private String agentCountry;
    @Lob // 대용량 텍스트를 저장하기 위해 사용
    private String introduction; // 소개문구
    @ElementCollection // 해시태그 목록을 저장하기 위해 사용
    private List<String> hashtags; // 해시태그 목록
    private String specIntroduction; // 스펙 소개글
    private double averageReviewRating; // 리뷰 별점 평균
}
