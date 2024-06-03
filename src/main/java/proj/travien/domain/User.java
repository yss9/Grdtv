package proj.travien.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String password;
    private String name;
    private String dateOfBirth;
    private String gender;
    private String mbti;
    private String profilePicture;
    private String nickname;
    private boolean isAdmin;
    private String verificationFile;
}
