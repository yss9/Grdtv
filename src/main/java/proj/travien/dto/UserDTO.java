package proj.travien.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.AllArgsConstructor;

@Getter
@Setter
@AllArgsConstructor
public class UserDTO {
    private String username; // 아이디
    private String password; // 비밀번호
    private String name; // 이름
    private String dateOfBirth; // 생년월일
    private String gender; // 성별
    private String mbti; // MBTI
    private String profilePicture; // 프로필사진
    private String nickname; // 닉네임
    private boolean isAdmin; // 관리자여부
    private String verificationFile; // 검증파일
}

