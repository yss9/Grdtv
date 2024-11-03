package proj.travien.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import proj.travien.domain.PointsHistory;
import proj.travien.domain.Role;
import proj.travien.domain.User;
import proj.travien.dto.AgentApplicationDTO;
import proj.travien.dto.UserDTO;
import proj.travien.dto.AgentDTO;
import proj.travien.repository.PointsHistoryRepository;
import proj.travien.repository.UserRepository;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final UserRepository userRepository;

    private final PointsHistoryRepository pointsHistoryRepository;

    @Autowired
    public UserService(UserRepository userRepository, PointsHistoryRepository pointsHistoryRepository) {
        this.userRepository = userRepository;
        this.pointsHistoryRepository = pointsHistoryRepository;
    }


    /**
     * 나은이가 추가
     */
    public void save(User user) {
        userRepository.save(user);  // 사용자 정보 저장
    }

    // 회원가입 시 기본 사용자로만 등록
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
        user.setAgent(false); // 기본 사용자는 예약대행자가 아님
        user.setRole(Role.ROLE_USER);
        user.setPoints(1000);

        // 프로필 사진 저장
        if (profilePictureFile != null && !profilePictureFile.isEmpty()) {
            String profilePicturePath = saveProfilePicture(profilePictureFile);
            user.setProfilePicture(profilePicturePath);
        }

        userRepository.save(user);
        return true;
    }

    // 예약대행자 신청
    public boolean applyAsAgent(String userId, AgentApplicationDTO agentDTO, MultipartFile verificationFile) {
        User user = userRepository.findByUserId(userId).orElse(null);
        if (user == null || user.isAgent()) {
            return false;
        }

        user.setAgent(true); // 예약대행자로 설정
        user.setAgentCountry(agentDTO.getAgentCountry());
        user.setIntroduction(agentDTO.getIntroduction());
        user.setHashtags(agentDTO.getHashtags());
        user.setSpecIntroduction(agentDTO.getSpecIntroduction());
        user.setAverageReviewRating(agentDTO.getAverageReviewRating());
        user.setRole(Role.ROLE_AGENT);

        // 검증 파일 저장
        if (verificationFile != null && !verificationFile.isEmpty()) {
            String verificationFilePath = saveVerificationFile(verificationFile);
            user.setVerificationFile(verificationFilePath);
        }

        userRepository.save(user);
        return true;
    }

    // 예약대행자 신청 승인 (관리자 권한 필요)
    public boolean approveAgentApplication(String userId) {
        User user = userRepository.findByUserId(userId).orElse(null);
        if (user == null || !user.isAgent() || user.getRole() != Role.ROLE_USER) {
            // 사용자가 없거나 이미 예약대행자이거나 ROLE_USER가 아닌 경우 승인 불가
            return false;
        }

        // 예약대행자 권한 부여
        user.setRole(Role.ROLE_AGENT);
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
            Path filePath = absoluteDirectory.resolve(Objects.requireNonNull(filename));
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

    // 특정 국가의 예약대행자 목록 조회
    public List<AgentDTO> getAgentsByCountry(String country) {
        return userRepository.findByIsAgentTrueAndAgentCountry(country).stream()
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

    public UserDTO createUserDTO(User user) {
        UserDTO userDTO = new UserDTO(
                user.getUserId(),
                null, // 비밀번호는 반환하지 않음
                user.getName(),
                user.getDateOfBirth(),
                user.getGender(),
                user.getMbti(),
                user.getProfilePicture(),
                user.getNickname(),
                user.isAgent(),
                user.getPoints()
        );

        if (user.isAgent()) {
            userDTO.setAgentDetails(createAgentDTO(user));
        }

        return userDTO;
    }

    // 공통된 AgentDTO 생성 로직을 메소드로 추출
    public AgentDTO createAgentDTO(User user) {
        return new AgentDTO(
                user.getAgentCountry(),
                user.getIntroduction(),
                user.getHashtags(),
                user.getSpecIntroduction(),
                user.getAverageReviewRating(),
                user.getNickname(),
                user.getProfilePicture()
        );
    }

    // 마이페이지 정보 조회 메서드
    public UserDTO getUserInfo(String userId) {
        User user = userRepository.findByUserId(userId).orElse(null);
        if (user == null) {
            return null;
        }

        return createUserDTO(user);
    }

    // 포인트 조회
    public int getUserPoints(String userId) {
        User user = userRepository.findByUserId(userId).orElse(null);
        if (user == null) {
            throw new IllegalArgumentException("User not found");
        }
        return user.getPoints();
    }

    // 포인트 추가
    @Transactional
    public boolean addUserPoints(String userId, int pointsToAdd) {
        User user = userRepository.findByUserId(userId).orElse(null);
        if (user == null) {
            throw new IllegalArgumentException("User not found");
        }

        if (pointsToAdd <= 0) {
            throw new IllegalArgumentException("Points to add must be positive");
        }

        user.setPoints(user.getPoints() + pointsToAdd); // 포인트 추가
        userRepository.save(user);

        // 포인트 히스토리 저장
        PointsHistory history = new PointsHistory(userId, pointsToAdd, "add");
        pointsHistoryRepository.save(history);

        return true;
    }

    // 포인트 차감
    @Transactional
    public boolean deductUserPoints(String userId, int pointsToDeduct) {
        User user = userRepository.findByUserId(userId).orElse(null);
        if (user == null) {
            throw new IllegalArgumentException("User not found");
        }

        if (pointsToDeduct <= 0) {
            throw new IllegalArgumentException("Points to deduct must be positive");
        }

        if (user.getPoints() < pointsToDeduct) {
            throw new IllegalArgumentException("Insufficient points");
        }

        user.setPoints(user.getPoints() - pointsToDeduct); // 포인트 차감
        userRepository.save(user);

        // 포인트 히스토리 저장
        PointsHistory history = new PointsHistory(userId, pointsToDeduct, "deduct");
        pointsHistoryRepository.save(history);

        return true;
    }

    //관리자 포인트 조정
    public boolean adjustPoints(String userId, int points) {
        User user = userRepository.findByUserId(userId).orElseThrow(() -> new IllegalArgumentException("User not found"));
        user.setPoints(user.getPoints() + points);
        userRepository.save(user);
        return true;
    }

    // 관리자 승격
    public void promoteToAdmin(String userId) {
        User user = userRepository.findByUserId(userId).orElseThrow(() -> new IllegalArgumentException("User not found"));

        // 기존 역할을 덮어쓰고 ROLE_ADMIN으로 설정
        user.setRole(Role.ROLE_ADMIN);

        userRepository.save(user);
    }

    //모든 사용자 조회
    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .map(this::createUserDTO)
                .collect(Collectors.toList());
    }

    //사용자 삭제
    public void deleteUser(String userId) {
        User user = userRepository.findByUserId(userId).orElseThrow(() -> new IllegalArgumentException("User not found"));
        userRepository.delete(user);
    }

}
