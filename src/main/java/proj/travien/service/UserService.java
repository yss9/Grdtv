package proj.travien.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import proj.travien.domain.User;
import proj.travien.dto.UserDTO;
import proj.travien.dto.AgentDTO;
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

    // 회원가입
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
        user.setAgent(userDTO.isAgent());  // 예약대행자 여부 설정

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

    // 프로필 사진 업로드
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

    // 검증 파일 업로드
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

    // 프로필 사진 로드
    public Resource loadProfilePicture(String userId) throws IOException {
        User user = userRepository.findByUserId(userId).orElse(null);
        if (user == null || user.getProfilePicture() == null) {
            throw new FileNotFoundException("Profile picture not found for user: " + userId);
        }
        return new FileSystemResource(Paths.get("src/main/resources").resolve(user.getProfilePicture()).toAbsolutePath().toString());
    }

    // 검증 파일 로드
    public Resource loadVerificationFile(String userId) throws IOException {
        User user = userRepository.findByUserId(userId).orElse(null);
        if (user == null || user.getVerificationFile() == null) {
            throw new FileNotFoundException("Verification file not found for user: " + userId);
        }
        return new FileSystemResource(Paths.get("src/main/resources").resolve(user.getVerificationFile()).toAbsolutePath().toString());
    }

    // 파일 저장
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

    // 프로필 사진 저장
    private String saveProfilePicture(MultipartFile profilePictureFile) {
        return saveFile(profilePictureFile, Paths.get("static/profile-pictures"));
    }

    // 검증 파일 저장
    private String saveVerificationFile(MultipartFile verificationFile) {
        return saveFile(verificationFile, Paths.get("static/verification-files"));
    }

    // 유저 ID 사용 여부 확인
    public boolean isUserIdInUse(String userId) {
        return userRepository.findByUserId(userId).isPresent();
    }

    // 닉네임 사용 여부 확인
    public boolean isNicknameInUse(String nickname) {
        return userRepository.findByNickname(nickname).isPresent();
    }

    // 비밀번호 해시
    private String hashPassword(String password) {
        return BCrypt.hashpw(password, BCrypt.gensalt());
    }

    // 로그인
    public User login(String userId, String password) {
        User user = userRepository.findByUserId(userId).orElse(null);
        if (user != null && BCrypt.checkpw(password, user.getPassword())) {
            return user;
        }
        return null;
    }

    // 모든 닉네임 조회
    public List<String> getAllNicknames() {
        return userRepository.findAll().stream()
                .map(User::getNickname)
                .collect(Collectors.toList());
    }

    // 유저 ID로 사용자 찾기
    public User findByUserId(String userId) {
        return userRepository.findByUserId(userId).orElse(null);
    }

    // 예약대행자 정보 업데이트
    public boolean updateAgentDetails(String userId, AgentDTO agentDTO) {
        User user = userRepository.findByUserId(userId).orElse(null);
        if (user == null || !user.isAgent()) {
            return false;
        }

        user.setAgentCountry(agentDTO.getAgentCountry());
        user.setIntroduction(agentDTO.getIntroduction());
        user.setHashtags(agentDTO.getHashtags());
        user.setSpecIntroduction(agentDTO.getSpecIntroduction());
        user.setAverageReviewRating(agentDTO.getAverageReviewRating());

        userRepository.save(user);
        return true;
    }

    // 예약대행자 목록 조회
    public List<AgentDTO> getAllAgents() {
        return userRepository.findByIsAgentTrue().stream()
                .map(user -> new AgentDTO(
                        user.getAgentCountry(),
                        user.getIntroduction(),
                        user.getHashtags(),
                        user.getSpecIntroduction(),
                        user.getAverageReviewRating(),
                        user.getNickname(),           // 닉네임 추가
                        user.getProfilePicture()      // 프로필 이미지 추가
                ))
                .collect(Collectors.toList());
    }

    // 마이페이지 정보 조회 메서드
    public UserDTO getUserInfo(String userId) {
        User user = userRepository.findByUserId(userId).orElse(null);
        if (user == null) {
            return null;
        }

        // 기본 사용자 정보 설정
        UserDTO userDTO = new UserDTO(
                user.getUserId(),
                null, // 비밀번호는 반환하지 않음
                user.getName(),
                user.getDateOfBirth(),
                user.getGender(),
                user.getMbti(),
                user.getProfilePicture(),
                user.getNickname(),
                user.isAgent()
        );

        // 예약대행자인 경우 AgentDTO 생성
        if (user.isAgent()) {
            AgentDTO agentDTO = new AgentDTO(
                    user.getAgentCountry(),
                    user.getIntroduction(),
                    user.getHashtags(),
                    user.getSpecIntroduction(),
                    user.getAverageReviewRating(),
                    user.getNickname(),
                    user.getProfilePicture()
            );
            userDTO.setAgentDetails(agentDTO);
        }

        return userDTO;
    }

}
