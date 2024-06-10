package proj.travien.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import proj.travien.JwtUtil;
import proj.travien.domain.User;
import proj.travien.dto.UserDTO;
import proj.travien.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private static final Logger log = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@RequestBody UserDTO userDTO) {
        if (userService.isUsernameInUse(userDTO.getUserId()) || userService.isNicknameInUse(userDTO.getNickname())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Username or nickname already in use");
        }

        boolean userCreated = userService.createUser(userDTO);

        if (userCreated) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("User could not be created");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserDTO request) {
        try {
            String userId = request.getUserId();
            String password = request.getPassword();

            User user = userService.login(userId, password);
            if (user != null) {
                String token = jwtUtil.generateToken(user.getId(), user.getNickname());
                return ResponseEntity.ok(new AuthResponse(token)); // JSON 객체로 토큰 반환
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password.");
            }
        } catch (Exception e) {
            // 로그 기록
            log.error("Error during login", e);
            // 클라이언트에게 오류 응답
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred during login.");
        }
    }

    @GetMapping("/check-username")
    public ResponseEntity<?> checkUsername(@RequestParam String username) {
        boolean exists = userService.isUsernameInUse(username);
        return ResponseEntity.ok(exists);
    }

    @GetMapping("/check-nickname")
    public ResponseEntity<?> checkNickname(@RequestParam String nickname) {
        boolean exists = userService.isNicknameInUse(nickname);
        return ResponseEntity.ok(exists);
    }

    static class AuthResponse {
        private String token;

        public AuthResponse(String token) {
            this.token = token;
        }

        public String getToken() {
            return token;
        }

        public void setToken(String token) {
            this.token = token;
        }
    }
}
