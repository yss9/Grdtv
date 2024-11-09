package proj.travien.controller;

import io.swagger.v3.oas.annotations.Operation;
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
import proj.travien.dto.AgentApplicationDTO;
import proj.travien.jwt.JwtUtil;
import proj.travien.domain.User;
import proj.travien.dto.AgentDTO;
import proj.travien.dto.UserDTO;
import proj.travien.service.UserService;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private static final Logger log = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @Operation(summary = "회원가입", description = "새로운 사용자를 등록")
    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@RequestPart("user") UserDTO userDTO,
                                    @RequestPart(value = "profilePicture", required = false) MultipartFile profilePictureFile) {
        if (userService.isUserIdInUse(userDTO.getUserId()) || userService.isNicknameInUse(userDTO.getNickname())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Username or nickname already in use");
        }

        // 기본 사용자로만 가입
        userDTO.setAgent(false); // 기본 사용자는 예약대행자가 아님
        boolean userCreated = userService.createUser(userDTO, profilePictureFile, null);

        if (userCreated) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("User could not be created");
        }
    }

    @Operation(summary = "예약대행자 신청")
    @PostMapping("/apply-agent")
    public ResponseEntity<?> applyAsAgent(@RequestParam("userId") String userId,
                                          @RequestPart("agentDetails") AgentApplicationDTO agentDTO,
                                          @RequestPart("verificationFile") MultipartFile verificationFile) {
        boolean applied = userService.applyAsAgent(userId, agentDTO, verificationFile);

        if (applied) {
            return ResponseEntity.ok().body("Successfully applied as an agent");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Agent application failed");
        }
    }

    @Operation(summary = "관리자가 예약대행자 신청 승인")
    @PostMapping("/approve-agent/{userId}")
    public ResponseEntity<?> approveAgentApplication(@PathVariable String userId) {
        boolean approved = userService.approveAgentApplication(userId);

        if (approved) {
            return ResponseEntity.ok("Agent application approved successfully");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to approve agent application");
        }
    }

    @Operation(summary = "해시태그로 예약대행자 검색")
    @GetMapping("/search-agents-by-hashtag")
    public ResponseEntity<List<AgentDTO>> searchAgentsByHashtag(@RequestParam("hashtag") String hashtag) {
        List<AgentDTO> agents = userService.searchAgentsByHashtag(hashtag);
        if (agents.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(agents);
    }

    @Operation(summary = "최근 승인된 예약대행자 리스트8명")
    @GetMapping("/recent-agents")
    public ResponseEntity<List<Map<String, Object>>> getRecentAgents() {
        List<Map<String, Object>> recentAgents = userService.getRecentAgents(8);
        return ResponseEntity.ok(recentAgents);
    }

    @Operation(summary = "로그인")
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

    @Operation(summary = "username으로 userid 체크")
    @GetMapping("/check-userid")
    public ResponseEntity<?> checkUserId(@RequestParam String username) {
        boolean exists = userService.isUserIdInUse(username);
        return ResponseEntity.ok(exists);
    }

    @Operation(summary = "닉네임 중복체크")
    @GetMapping("/check-nickname")
    public ResponseEntity<?> checkNickname(@RequestParam String nickname) {
        boolean exists = userService.isNicknameInUse(nickname);
        return ResponseEntity.ok(exists);
    }

    @Operation(summary = "프로필사진 업로드")
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

    @Operation(summary = "검증 문서 업로드")
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

    @Operation(summary = "프로필 수정")
    @PostMapping("/update-profile")
    public ResponseEntity<?> updateUserProfile(@RequestParam("userId") String userId, @RequestBody UserDTO userDTO) {
        boolean updated = userService.updateUserProfile(userId, userDTO);
        if (updated) {
            return ResponseEntity.ok("User profile updated successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }

    @Operation(summary = "예약대행자 정보 수정")
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

    @Operation(summary = "전체 예약대행자 조회 및 특정 국가의 예약대행자 조회")
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

    @Operation(summary = "마이페이지 정보 조회")
    @GetMapping("/my-info")
    public ResponseEntity<?> getMyInfo(@RequestParam("userId") String userId) {
        UserDTO userDTO = userService.getUserInfo(userId);
        if (userDTO != null) {
            return ResponseEntity.ok(userDTO);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }

    @Operation(summary = "모든 유저 닉네임 조회")
    @GetMapping("/nicknames")
    public ResponseEntity<List<String>> getAllNicknames() {
        List<String> nicknames = userService.getAllNicknames();
        return new ResponseEntity<>(nicknames, HttpStatus.OK);
    }

    @Operation(summary = "프로필 사진 조회")
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

    @Operation(summary = "검증파일 조회")
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

    @Operation(summary = "포인트 조회")
    @GetMapping("/{userId}/points")
    public ResponseEntity<?> getUserPoints(@PathVariable String userId) {
        try {
            int points = userService.getUserPoints(userId);
            return ResponseEntity.ok(points);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @Operation(summary = "포인트 추가")
    @PostMapping("/{nickname}/points/add")
    public ResponseEntity<?> addUserPoints(@PathVariable String nickname, @RequestParam int points) {
        try {
            boolean success = userService.addPointsByNickname(nickname, points);
            if (success) {
                return ResponseEntity.ok("Points added successfully");
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to add points");
            }
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @Operation(summary = "포인트 차감")
    @PostMapping("/{nickname}/points/deduct")
    public ResponseEntity<?> deductUserPoints(@PathVariable String nickname, @RequestParam int points) {
        try {
            boolean success = userService.deductPointsByNickname(nickname, points);
            if (success) {
                return ResponseEntity.ok("Points deducted successfully");
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to deduct points");
            }
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @Operation(summary = "포인트 전송")
    @PostMapping("/transfer-points")
    public ResponseEntity<?> transferPoints(
            @RequestParam("userNickname") String userNickname,
            @RequestParam("agentNickname") String agentNickname,
            @RequestParam("points") int points) {
        try {
            // 사용자 포인트 차감 및 예약대행자 포인트 추가
            boolean userDeducted = userService.deductPointsByNickname(userNickname, points);
            if (!userDeducted) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to deduct points from user");
            }

            boolean agentAdded = userService.addPointsByNickname(agentNickname, points);
            if (agentAdded) {
                return ResponseEntity.ok("Points transferred successfully");
            } else {
                // 포인트 추가 실패 시 사용자에게 차감된 포인트를 복구
                userService.addPointsByNickname(userNickname, points);
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to add points to agent");
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
