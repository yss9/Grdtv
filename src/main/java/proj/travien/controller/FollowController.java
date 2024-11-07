package proj.travien.controller;

import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import proj.travien.domain.User;
import proj.travien.dto.AgentDTO;
import proj.travien.dto.UserDTO;
import proj.travien.service.FollowService;
import proj.travien.service.UserService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/follow")
public class FollowController {

    @Autowired
    private FollowService followService;

    @Autowired
    private UserService userService;

    @Operation(summary = "예약대행자 팔로우")
    @PostMapping("/follow-agent")
    public ResponseEntity<?> followAgent(@RequestParam String userId, @RequestParam String agentId) {
        boolean followed = followService.followAgent(userId, agentId);
        if (followed) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Could not follow the agent");
        }
    }

    @Operation(summary = "팔로우한 예약대행자")
    @GetMapping("/followed-agents")
    public ResponseEntity<List<UserDTO>> getFollowedAgents(@RequestParam String userId) {
        // FollowService에서 가져온 User 목록을 UserService에서 DTO로 변환
        List<User> agents = followService.getFollowedAgents(userId);
        List<UserDTO> agentDTOs = agents.stream()
                .map(userService::createUserDTO)  // 중복된 DTO 생성 로직을 UserService로 위임
                .collect(Collectors.toList());

        return ResponseEntity.ok(agentDTOs);
    }
}

