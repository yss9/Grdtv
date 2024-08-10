package proj.travien.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import proj.travien.domain.Follow;
import proj.travien.domain.User;
import proj.travien.repository.FollowRepository;
import proj.travien.repository.UserRepository;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FollowService {

    @Autowired
    private FollowRepository followRepository;

    @Autowired
    private UserRepository userRepository;

    public boolean followAgent(String userId, String agentId) {
        User user = userRepository.findByUserId(userId).orElse(null);
        User agent = userRepository.findByUserId(agentId).orElse(null);

        if (user == null || agent == null || !agent.isAgent()) {
            return false;
        }

        if (followRepository.existsByUserAndAgent(user, agent)) {
            return false; // 이미 팔로우 중
        }

        Follow follow = new Follow();
        follow.setUser(user);
        follow.setAgent(agent);

        followRepository.save(follow);
        return true;
    }

    public List<User> getFollowedAgents(String userId) {
        User user = userRepository.findByUserId(userId).orElse(null);
        if (user == null) {
            return Collections.emptyList();
        }
        return followRepository.findByUser(user)
                .stream()
                .map(Follow::getAgent)
                .collect(Collectors.toList());
    }
}
