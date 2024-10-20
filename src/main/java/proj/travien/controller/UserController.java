package proj.travien.controller;

import lombok.Getter;
import lombok.Setter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import proj.travien.jwt.JwtUtil;
import proj.travien.domain.User;
import proj.travien.dto.AgentDTO;
import proj.travien.dto.UserDTO;
import proj.travien.service.UserService;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private static final Logger log = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@RequestPart("user") UserDTO userDTO,
                                    @RequestParam("isAgent") String isAgentStr,
                                    @RequestPart(value = "profilePicture", required = false) MultipartFile profilePictureFile,
                                    @RequestPart(value = "verificationFile", required = false) MultipartFile verificationFile) {
        if (userService.isUserIdInUse(userDTO.getUserId()) || userService.isNicknameInUse(userDTO.getNickname())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Username or nickname already in use");
        }

        boolean isAgent = Boolean.parseBoolean(isAgentStr);
        System.out.println("isAgent: " + isAgent);  // 로그로 확인

        // DTO로 변환된 값에 isAgent 설정
        userDTO.setAgent(isAgent);

        boolean userCreated = userService.createUser(userDTO, profilePictureFile, verificationFile);

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
                String token = jwtUtil.generateToken(user.getId(),user.getUserId(), user.getNickname(), user.getRole());
                return ResponseEntity.ok(new AuthResponse(token));
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password.");
            }
        } catch (Exception e) {
            log.error("Error during login", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred during login.");
        }
    }

    @GetMapping("/check-userid")
    public ResponseEntity<?> checkUserId(@RequestParam String username) {
        boolean exists = userService.isUserIdInUse(username);
        return ResponseEntity.ok(exists);
    }

    @GetMapping("/check-nickname")
    public ResponseEntity<?> checkNickname(@RequestParam String nickname) {
        boolean exists = userService.isNicknameInUse(nickname);
        return ResponseEntity.ok(exists);
    }

    @PostMapping("/upload-profile-picture")
    public ResponseEntity<?> uploadProfilePicture(@RequestParam("userId") String userId,
                                                  @RequestPart("profilePicture") MultipartFile profilePictureFile) {
        boolean uploaded = userService.uploadProfilePicture(userId, profilePictureFile);
        if (uploaded) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Profile picture could not be uploaded");
        }
    }

    @PostMapping("/upload-verification-file")
    public ResponseEntity<?> uploadVerificationFile(@RequestParam("userId") String userId,
                                                    @RequestPart("verificationFile") MultipartFile verificationFile) {
        boolean uploaded = userService.uploadVerificationFile(userId, verificationFile);
        if (uploaded) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Verification file could not be uploaded");
        }
    }

    // 예약대행자 정보 업데이트
    @PostMapping("/update-agent-details")
    public ResponseEntity<?> updateAgentDetails(@RequestParam("userId") String userId,
                                                @RequestBody AgentDTO agentDTO) {
        boolean updated = userService.updateAgentDetails(userId, agentDTO);
        if (updated) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Agent details could not be updated");
        }
    }

    // 전체 예약대행자 조회 및 특정 국가의 예약대행자 조회
    @GetMapping("/agents")
    public ResponseEntity<List<AgentDTO>> getAgents(@RequestParam(value = "country", required = false) String country) {
        List<AgentDTO> agents;
        if (country != null) {
            // 특정 국가의 에이전트 조회
            agents = userService.getAgentsByCountry(country);
        } else {
            // 전체 에이전트 조회
            agents = userService.getAllAgents();
        }
        return ResponseEntity.ok(agents);
    }

    // 마이페이지 정보 조회
    @GetMapping("/my-info")
    public ResponseEntity<?> getMyInfo(@RequestParam("userId") String userId) {
        UserDTO userDTO = userService.getUserInfo(userId);
        if (userDTO != null) {
            return ResponseEntity.ok(userDTO);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }

    @GetMapping("/nicknames")
    public ResponseEntity<List<String>> getAllNicknames() {
        List<String> nicknames = userService.getAllNicknames();
        return new ResponseEntity<>(nicknames, HttpStatus.OK);
    }

    @GetMapping("/profile-picture/{userId}")
    public ResponseEntity<Resource> getProfilePicture(@PathVariable String userId) {
        try {
            Resource file = userService.loadProfilePicture(userId);
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"")
                    .body(file);
        } catch (IOException e) {
            log.error("Error loading profile picture for userId: {}", userId, e);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @GetMapping("/verification-file/{userId}")
    public ResponseEntity<Resource> getVerificationFile(@PathVariable String userId) {
        try {
            Resource file = userService.loadVerificationFile(userId);
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"")
                    .body(file);
        } catch (IOException e) {
            log.error("Error loading verification file for userId: {}", userId, e);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    // 포인트 조회
    @GetMapping("/{userId}/points")
    public ResponseEntity<?> getUserPoints(@PathVariable String userId) {
        try {
            int points = userService.getUserPoints(userId);
            return ResponseEntity.ok(points);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    // 포인트 추가
    @PostMapping("/{userId}/points/add")
    public ResponseEntity<?> addUserPoints(@PathVariable String userId, @RequestParam int pointsToAdd) {
        try {
            boolean success = userService.addUserPoints(userId, pointsToAdd);
            if (success) {
                return ResponseEntity.ok("Points added successfully");
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to add points");
            }
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    // 포인트 차감
    @PostMapping("/{userId}/points/deduct")
    public ResponseEntity<?> deductUserPoints(@PathVariable String userId, @RequestParam int pointsToDeduct) {
        try {
            boolean success = userService.deductUserPoints(userId, pointsToDeduct);
            if (success) {
                return ResponseEntity.ok("Points deducted successfully");
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to deduct points");
            }
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }


    @Setter
    @Getter
    static class AuthResponse {
        private String token;

        public AuthResponse(String token) {
            this.token = token;
        }

    }
}
