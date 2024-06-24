package proj.travien.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import proj.travien.domain.User;
import proj.travien.dto.UserDTO;
import proj.travien.repository.UserRepository;

import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@AutoConfigureTestDatabase(replace = Replace.NONE)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testCreateUser_UsernameAlreadyInUse() {
        UserDTO userDTO = new UserDTO("username", "password", "Test User", "1990-01-01", "M", "INTJ", "picture", "nickname", false, "file");

        when(userRepository.findByUsername(userDTO.getUsername())).thenReturn(new User());

        boolean result = userService.createUser(userDTO);
        assertFalse(result);
    }

    @Test
    void testCreateUser_NicknameAlreadyInUse() {
        UserDTO userDTO = new UserDTO("username", "password", "Test User", "1990-01-01", "M", "INTJ", "picture", "nickname", false, "file");

        when(userRepository.findByNickname(userDTO.getNickname())).thenReturn(new User());

        boolean result = userService.createUser(userDTO);
        assertFalse(result);
    }

    @Test
    void testCreateUser_Success() {
        UserDTO userDTO = new UserDTO("username", "password", "Test User", "1990-01-01", "M", "INTJ", "picture", "nickname", false, "file");

        when(userRepository.findByUsername(userDTO.getUsername())).thenReturn(null);
        when(userRepository.findByNickname(userDTO.getNickname())).thenReturn(null);
        when(userRepository.save(any(User.class))).thenReturn(new User());

        boolean result = userService.createUser(userDTO);
        assertTrue(result);
    }

    @Test
    void testLogin_Success() {
        String username = "username";
        String password = "password";

        User user = new User();
        user.setUsername(username);
        user.setPassword(BCrypt.hashpw(password, BCrypt.gensalt()));

        when(userRepository.findByUsername(username)).thenReturn(user);

        User result = userService.login(username, password);
        assertNotNull(result);
    }

    @Test
    void testLogin_Failure() {
        String username = "username";
        String password = "password";

        when(userRepository.findByUsername(username)).thenReturn(null);

        User result = userService.login(username, password);
        assertNull(result);
    }

    @Test
    void testCheckUsernameExistence() {
        String username = "username";

        when(userRepository.findByUsername(username)).thenReturn(new User());

        boolean result = userService.isUserIdInUse(username);
        assertTrue(result);
    }

    @Test
    void testCheckNicknameExistence() {
        String nickname = "nickname";

        when(userRepository.findByNickname(nickname)).thenReturn(new User());

        boolean result = userService.isNicknameInUse(nickname);
        assertTrue(result);
    }
}
