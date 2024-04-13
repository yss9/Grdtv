package proj.travien.service;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import proj.travien.domain.User;
import proj.travien.dto.UserDTO;
import proj.travien.exception.EmailAlreadyUsedException;
import proj.travien.repository.UserRepository;


@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private BCryptPasswordEncoder passwordEncoder;

    @InjectMocks
    private UserService userService;

    @Test
    void CreateUser_ThrowsEmailAlreadyUsed() {
        UserDTO userDTO = new UserDTO("user@example.com", "password123");
        when(userRepository.findByEmail("user@example.com")).thenReturn(new User());

        assertThrows(EmailAlreadyUsedException.class, () -> {
            userService.createUser(userDTO);
        });
    }

    @Test
    void CreateUser_Success() {
        UserDTO userDTO = new UserDTO("user@example.com", "password123");
        User expectedUser = new User();
        expectedUser.setEmail(userDTO.getEmail());
        expectedUser.setPassword(userDTO.getPassword());

        when(userRepository.save(any(User.class))).thenReturn(expectedUser);

        User actualUser = userService.createUser(userDTO);
        assertNotNull(actualUser, "User should not be null");
        assertEquals(expectedUser.getEmail(), actualUser.getEmail(), "Emails do not match");
        assertEquals(expectedUser.getPassword(), actualUser.getPassword(), "Passwords do not match");
    }

    @Test
    void Login_Success() {
        User mockUser = new User();
        mockUser.setEmail("user@example.com");
        mockUser.setPassword(BCrypt.hashpw("password123", BCrypt.gensalt()));

        when(userRepository.findByEmail("user@example.com")).thenReturn(mockUser);

        User result = userService.login("user@example.com", "password123");
        assertNotNull(result);
    }

    @Test
    void Login_Failure() {
        when(userRepository.findByEmail("user@example.com")).thenReturn(null);

        User result = userService.login("user@example.com", "password123");
        assertNull(result);
    }
}