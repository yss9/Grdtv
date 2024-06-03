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
        if (isEmailInUse(userDTO.getEmail())) {
            return false;
        }
        User user = new User();
        user.setName(userDTO.getName());
        user.setEmail(userDTO.getEmail());
        user.setPassword(hashPassword(userDTO.getPassword()));
        userRepository.save(user);
        return true;
    }

    public boolean isEmailInUse(String email) {
        return userRepository.findByEmail(email) != null;
    }

    public boolean checkEmailExistence(String email) {
        return userRepository.findByEmail(email) != null;
    }

    private String hashPassword(String password) {
        return BCrypt.hashpw(password, BCrypt.gensalt());
    }

    public User login(String email, String password) {
        User user = userRepository.findByEmail(email);
        if (user != null && BCrypt.checkpw(password, user.getPassword())) {
            return user;
        }
        return null;
    }
}
