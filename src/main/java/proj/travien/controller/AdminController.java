package proj.travien.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import proj.travien.dto.UserDTO;
import proj.travien.service.UserService;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final UserService userService;

    @Autowired
    public AdminController(UserService userService) {
        this.userService = userService;
    }

    // 관리자 전용 API: 특정 사용자의 포인트 조정
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/adjust-points")
    public ResponseEntity<?> adjustUserPoints(@RequestParam String userId, @RequestParam int points) {
        try {
            boolean success = userService.adjustPoints(userId, points);
            if (success) {
                return ResponseEntity.ok("Points adjusted successfully for user: " + userId);
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to adjust points");
            }
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    // 관리자 전용 API: 특정 사용자를 관리자 역할로 승격
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/promote-user")
    public ResponseEntity<?> promoteUserToAdmin(@RequestParam String userId) {
        try {
            userService.promoteToAdmin(userId);
            return ResponseEntity.ok("User " + userId + " promoted to admin");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    // 관리자 전용 API: 모든 유저 목록 조회
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/all-users")
    public ResponseEntity<?> getAllUsers() {
        try {
            return ResponseEntity.ok(userService.getAllUsers());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to retrieve users");
        }
    }

    // 관리자 전용 API: 특정 사용자 삭제
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/delete-user/{userId}")
    public ResponseEntity<?> deleteUser(@PathVariable String userId) {
        try {
            userService.deleteUser(userId);
            return ResponseEntity.ok("User " + userId + " deleted successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}
