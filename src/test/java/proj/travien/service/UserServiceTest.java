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

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

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
    void testCreateUser_EmailAlreadyInUse() {
        UserDTO userDTO = new UserDTO("Test User", "test@example.com", "password");

        when(userRepository.findByEmail(userDTO.getEmail())).thenReturn(new User());

        boolean result = userService.createUser(userDTO);
        assertFalse(result);
    }

    @Test
    void testCreateUser_Success() {
        UserDTO userDTO = new UserDTO("Test User", "test@example.com", "password");

        when(userRepository.findByEmail(userDTO.getEmail())).thenReturn(null);
        when(userRepository.save(any(User.class))).thenReturn(new User());

        boolean result = userService.createUser(userDTO);
        assertTrue(result);
    }

    @Test
    void testLogin_Success() {
        String email = "test@example.com";
        String password = "password";

        User user = new User();
        user.setEmail(email);
        user.setPassword(BCrypt.hashpw(password, BCrypt.gensalt()));

        when(userRepository.findByEmail(email)).thenReturn(user);

        User result = userService.login(email, password);
        assertNotNull(result);
    }

    @Test
    void testLogin_Failure() {
        String email = "test@example.com";
        String password = "password";

        when(userRepository.findByEmail(email)).thenReturn(null);

        User result = userService.login(email, password);
        assertNull(result);
    }

    @Test
    void testCheckEmailExistence() {
        String email = "test@example.com";

        when(userRepository.findByEmail(email)).thenReturn(new User());

        boolean result = userService.checkEmailExistence(email);
        assertTrue(result);
    }
}
