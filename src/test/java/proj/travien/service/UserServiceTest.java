package proj.travien.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.core.io.Resource;
import org.springframework.core.io.FileSystemResource;
import org.springframework.web.multipart.MultipartFile;
import proj.travien.domain.User;
import proj.travien.dto.UserDTO;
import proj.travien.repository.UserRepository;

import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;

public class UserServiceTest {

    @InjectMocks
    private UserService userService;

    @Mock
    private UserRepository userRepository;

    @Mock
    private MultipartFile profilePictureFile;

    @Mock
    private MultipartFile verificationFile;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testCreateUser() {
        UserDTO userDTO = new UserDTO("testUser", "testPass", "Test", "2000-01-01", "M", "INTJ", "profile.jpg", "testNick", false, "verification.pdf");
        given(userRepository.findByUserId(anyString())).willReturn(Optional.empty());
        given(userRepository.findByNickname(anyString())).willReturn(Optional.empty());

        boolean result = userService.createUser(userDTO, profilePictureFile, verificationFile);

        assertThat(result).isTrue();
        verify(userRepository).save(any(User.class));
    }

    @Test
    void testLogin() {
        User user = new User();
        user.setUserId("testUser");
        user.setPassword("$2a$10$1234567890123456789012");
        given(userRepository.findByUserId(anyString())).willReturn(Optional.of(user));

        User result = userService.login("testUser", "testPass");

        assertThat(result).isNotNull();
    }

    @Test
    void testIsUserIdInUse() {
        given(userRepository.findByUserId(anyString())).willReturn(Optional.of(new User()));

        boolean result = userService.isUserIdInUse("testUser");

        assertThat(result).isTrue();
    }

    @Test
    void testLoadProfilePicture() throws Exception {
        User user = new User();
        user.setUserId("testUser");
        user.setProfilePicture("src/main/resources/static/profile-pictures/test.jpg");
        given(userRepository.findByUserId(anyString())).willReturn(Optional.of(user));

        Resource result = userService.loadProfilePicture("testUser");

        assertThat(result).isInstanceOf(FileSystemResource.class);
        assertThat(result.exists()).isTrue();
    }
}
