package proj.travien.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import proj.travien.domain.User;
import proj.travien.dto.UserDTO;
import proj.travien.repository.UserRepository;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public boolean createUser(UserDTO userDTO, MultipartFile profilePictureFile, MultipartFile verificationFile) {
        if (isUserIdInUse(userDTO.getUserId()) || isNicknameInUse(userDTO.getNickname())) {
            return false;
        }
        User user = new User();
        user.setUserId(userDTO.getUserId());
        user.setPassword(hashPassword(userDTO.getPassword()));
        user.setName(userDTO.getName());
        user.setDateOfBirth(userDTO.getDateOfBirth());
        user.setGender(userDTO.getGender());
        user.setMbti(userDTO.getMbti());
        user.setNickname(userDTO.getNickname());
        user.setAdmin(userDTO.isAdmin());

        if (profilePictureFile != null && !profilePictureFile.isEmpty()) {
            String profilePicturePath = saveProfilePicture(profilePictureFile);
            user.setProfilePicture(profilePicturePath);
        }

        if (verificationFile != null && !verificationFile.isEmpty()) {
            String verificationFilePath = saveVerificationFile(verificationFile);
            user.setVerificationFile(verificationFilePath);
        }

        userRepository.save(user);
        return true;
    }

    public boolean uploadProfilePicture(String userId, MultipartFile profilePictureFile) {
        User user = userRepository.findByUserId(userId).orElse(null);
        if (user == null) {
            return false;
        }

        String profilePicturePath = saveProfilePicture(profilePictureFile);
        user.setProfilePicture(profilePicturePath);
        userRepository.save(user);
        return true;
    }

    public boolean uploadVerificationFile(String userId, MultipartFile verificationFile) {
        User user = userRepository.findByUserId(userId).orElse(null);
        if (user == null) {
            return false;
        }

        String verificationFilePath = saveVerificationFile(verificationFile);
        user.setVerificationFile(verificationFilePath);
        userRepository.save(user);
        return true;
    }

    private String saveProfilePicture(MultipartFile profilePictureFile) {
        return saveFile(profilePictureFile, Paths.get("static/profile-pictures"));
    }

    private String saveVerificationFile(MultipartFile verificationFile) {
        return saveFile(verificationFile, Paths.get("static/verification-files"));
    }

    public Resource loadProfilePicture(String userId) throws IOException {
        User user = userRepository.findByUserId(userId).orElse(null);
        if (user == null || user.getProfilePicture() == null) {
            throw new FileNotFoundException("Profile picture not found for user: " + userId);
        }
        return new FileSystemResource(Paths.get("src/main/resources").resolve(user.getProfilePicture()).toAbsolutePath().toString());
    }

    public Resource loadVerificationFile(String userId) throws IOException {
        User user = userRepository.findByUserId(userId).orElse(null);
        if (user == null || user.getVerificationFile() == null) {
            throw new FileNotFoundException("Verification file not found for user: " + userId);
        }
        return new FileSystemResource(Paths.get("src/main/resources").resolve(user.getVerificationFile()).toAbsolutePath().toString());
    }

    private String saveFile(MultipartFile file, Path directory) {
        try {
            Path absoluteDirectory = Paths.get("src/main/resources").resolve(directory).toAbsolutePath();
            File dir = absoluteDirectory.toFile();
            if (!dir.exists() && !dir.mkdirs()) {
                throw new RuntimeException("Failed to create directory " + absoluteDirectory);
            }

            String filename = file.getOriginalFilename();
            Path filePath = absoluteDirectory.resolve(filename);
            file.transferTo(filePath.toFile());
            return directory.resolve(filename).toString(); // 상대 경로 저장
        } catch (IOException e) {
            throw new RuntimeException("Failed to save file", e);
        }
    }

    public boolean isUserIdInUse(String userId) {
        return userRepository.findByUserId(userId).isPresent();
    }

    public boolean isNicknameInUse(String nickname) {
        return userRepository.findByNickname(nickname).isPresent();
    }

    private String hashPassword(String password) {
        return BCrypt.hashpw(password, BCrypt.gensalt());
    }

    public User login(String userId, String password) {
        User user = userRepository.findByUserId(userId).orElse(null);
        if (user != null && BCrypt.checkpw(password, user.getPassword())) {
            return user;
        }
        return null;
    }

    public List<String> getAllNicknames() {
        return userRepository.findAll().stream()
                .map(User::getNickname)
                .collect(Collectors.toList());
    }

    public User findByUserId(String userId) {
        return userRepository.findByUserId(userId).orElse(null);
    }
}
