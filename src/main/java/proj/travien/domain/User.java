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

    @Column(name = "is_agent")
    private boolean isAgent;
    private String verificationFile;
    private String agentCountry;

    @Lob
    private String introduction;

    @ElementCollection
    private List<String> hashtags;

    private String specIntroduction;
    private double averageReviewRating;

    // 명시적인 게터와 세터
    public boolean isAgent() {
        return isAgent;
    }

    public void setAgent(boolean isAgent) {
        this.isAgent = isAgent;
    }
}

