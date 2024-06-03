package proj.travien.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import proj.travien.domain.User;
import proj.travien.dto.UserDTO;
import proj.travien.repository.UserRepository;

import org.springframework.security.crypto.bcrypt.BCrypt;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public boolean createUser(UserDTO userDTO) {
        if (isUsernameInUse(userDTO.getUsername()) || isNicknameInUse(userDTO.getNickname())) {
            return false;
        }
        User user = new User();
        user.setUsername(userDTO.getUsername());
        user.setPassword(hashPassword(userDTO.getPassword()));
        user.setName(userDTO.getName());
        user.setDateOfBirth(userDTO.getDateOfBirth());
        user.setGender(userDTO.getGender());
        user.setMbti(userDTO.getMbti());
        user.setProfilePicture(userDTO.getProfilePicture());
        user.setNickname(userDTO.getNickname());
        user.setAdmin(userDTO.isAdmin());
        user.setVerificationFile(userDTO.getVerificationFile());
        userRepository.save(user);
        return true;
    }

    public boolean isUsernameInUse(String username) {
        return userRepository.findByUsername(username) != null;
    }

    public boolean isNicknameInUse(String nickname) {
        return userRepository.findByNickname(nickname) != null;
    }

    private String hashPassword(String password) {
        return BCrypt.hashpw(password, BCrypt.gensalt());
    }

    public User login(String username, String password) {
        User user = userRepository.findByUsername(username);
        if (user != null && BCrypt.checkpw(password, user.getPassword())) {
            return user;
        }
        return null;
    }
}
