package proj.travien.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import proj.travien.domain.User;
import proj.travien.dto.AgentDTO;
import proj.travien.dto.UserDTO;
import proj.travien.service.FollowService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/follow")
public class FollowController {

    @Autowired
    private FollowService followService;

    @PostMapping("/follow-agent")
    public ResponseEntity<?> followAgent(@RequestParam String userId, @RequestParam String agentId) {
        boolean followed = followService.followAgent(userId, agentId);
        if (followed) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Could not follow the agent");
        }
    }

    @GetMapping("/followed-agents")
    public ResponseEntity<List<UserDTO>> getFollowedAgents(@RequestParam String userId) {
        List<User> agents = followService.getFollowedAgents(userId);
        List<UserDTO> agentDTOs = agents.stream()
                .map(agent -> {
                    UserDTO userDTO = new UserDTO(
                            agent.getUserId(),
                            null, // 비밀번호는 반환하지 않음
                            agent.getName(),
                            agent.getDateOfBirth(),
                            agent.getGender(),
                            agent.getMbti(),
                            agent.getProfilePicture(),
                            agent.getNickname(),
                            agent.isAgent()
                    );

                    if (agent.isAgent()) {
                        AgentDTO agentDetails = new AgentDTO(
                                agent.getAgentCountry(),
                                agent.getIntroduction(),
                                agent.getHashtags(),
                                agent.getSpecIntroduction(),
                                agent.getAverageReviewRating(),
                                agent.getNickname(),
                                agent.getProfilePicture()
                        );
                        userDTO.setAgentDetails(agentDetails);
                    }

                    return userDTO;
                })
                .collect(Collectors.toList());
        return ResponseEntity.ok(agentDTOs);
    }

}

