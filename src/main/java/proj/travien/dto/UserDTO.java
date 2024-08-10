package proj.travien.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.AllArgsConstructor;

@Getter
@Setter
@AllArgsConstructor
public class UserDTO {
    private String userId;
    private String password; // 비밀번호는 필요할 경우 null로 설정
    private String name;
    private String dateOfBirth;
    private String gender;
    private String mbti;
    private String profilePicture;
    private String nickname;
    private boolean isAgent;
    private String verificationFile;

    // AgentDTO를 포함하는 필드
    private AgentDTO agentDetails;

    // 예약대행자 필드를 포함하지 않는 생성자
    public UserDTO(String userId, String password, String name, String dateOfBirth, String gender, String mbti,
                   String profilePicture, String nickname, boolean isAgent, String verificationFile) {
        this.userId = userId;
        this.password = password;
        this.name = name;
        this.dateOfBirth = dateOfBirth;
        this.gender = gender;
        this.mbti = mbti;
        this.profilePicture = profilePicture;
        this.nickname = nickname;
        this.isAgent = isAgent;
        this.verificationFile = verificationFile;
    }
}

