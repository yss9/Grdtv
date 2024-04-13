package proj.travien.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.AllArgsConstructor;

@Getter
@Setter
@AllArgsConstructor // 모든 매개변수를 받는 생성자 자동 생성
public class UserDTO {
    private String email;
    private String password;
}
