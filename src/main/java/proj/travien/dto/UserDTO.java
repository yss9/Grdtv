package proj.travien.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.AllArgsConstructor;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor // 기본 생성자 자동 추가
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
    private int points; // 포인트 필드 복원
    private String statusMessage; // 상태 메시지 필드 추가

    // AgentDTO를 포함하는 필드
    @Setter
    private AgentDTO agentDetails;

    // 예약대행자 필드를 포함하지 않는 생성자
    public UserDTO(String userId, String password, String name, String dateOfBirth, String gender, String mbti,
                   String profilePicture, String nickname, boolean isAgent, int points, String statusMessage) {
        this.userId = userId;
        this.password = password;
        this.name = name;
        this.dateOfBirth = dateOfBirth;
        this.gender = gender;
        this.mbti = mbti;
        this.profilePicture = profilePicture;
        this.nickname = nickname;
        this.isAgent = isAgent;
        this.points = points; // 포인트 필드 설정
        this.statusMessage = statusMessage; // 상태 메시지 설정
    }
}
