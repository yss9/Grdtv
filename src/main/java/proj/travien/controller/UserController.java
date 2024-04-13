package proj.travien.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import proj.travien.JwtUtil;
import proj.travien.domain.User;
import proj.travien.dto.UserDTO;
import proj.travien.exception.EmailAlreadyUsedException;
import proj.travien.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@RequestBody UserDTO userDTO) {
        try {
            userService.createUser(userDTO);
            return ResponseEntity.ok().build();
        } catch (EmailAlreadyUsedException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserDTO request) {
        String email = request.getEmail();
        String password = request.getPassword();

        User user = userService.login(email, password);
        if (user != null) {
            String token = jwtUtil.generateToken(user.getEmail());
            return ResponseEntity.ok(token); // 토큰 반환 확인
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
}
