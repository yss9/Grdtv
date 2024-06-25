package proj.travien.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import proj.travien.JwtUtil;
import proj.travien.domain.User;
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
                                    @RequestPart(value = "profilePicture", required = false) MultipartFile profilePictureFile,
                                    @RequestPart(value = "verificationFile", required = false) MultipartFile verificationFile) {
        if (userService.isUserIdInUse(userDTO.getUserId()) || userService.isNicknameInUse(userDTO.getNickname())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Username or nickname already in use");
        }

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
                String token = jwtUtil.generateToken(user.getId(), user.getNickname());
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
            log.error("Error loading profile picture for userId: " + userId, e);
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
            log.error("Error loading verification file for userId: " + userId, e);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
}
