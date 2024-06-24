package proj.travien.controller;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import proj.travien.JwtUtil;
import proj.travien.domain.User;
import proj.travien.dto.UserDTO;
import proj.travien.service.UserService;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@AutoConfigureTestDatabase(replace = Replace.NONE)
class UserControllerTest {

    @Mock
    private UserService userService;

    @Mock
    private JwtUtil jwtUtil;

    @InjectMocks
    private UserController userController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testSignUp_UsernameAlreadyInUse() {
        UserDTO userDTO = new UserDTO("username", "password", "Test User", "1990-01-01", "M", "INTJ", "picture", "nickname", false, "file");

        when(userService.isUserIdInUse(userDTO.getUsername())).thenReturn(true);

        ResponseEntity<?> response = userController.signUp(userDTO);
        assertEquals(HttpStatus.CONFLICT, response.getStatusCode());
    }

    @Test
    void testSignUp_NicknameAlreadyInUse() {
        UserDTO userDTO = new UserDTO("username", "password", "Test User", "1990-01-01", "M", "INTJ", "picture", "nickname", false, "file");

        when(userService.isNicknameInUse(userDTO.getNickname())).thenReturn(true);

        ResponseEntity<?> response = userController.signUp(userDTO);
        assertEquals(HttpStatus.CONFLICT, response.getStatusCode());
    }

    @Test
    void testSignUp_Success() {
        UserDTO userDTO = new UserDTO("username", "password", "Test User", "1990-01-01", "M", "INTJ", "picture", "nickname", false, "file");

        when(userService.isUserIdInUse(userDTO.getUsername())).thenReturn(false);
        when(userService.isNicknameInUse(userDTO.getNickname())).thenReturn(false);
        when(userService.createUser(userDTO)).thenReturn(true);

        ResponseEntity<?> response = userController.signUp(userDTO);
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    void testLogin_Success() {
        UserDTO userDTO = new UserDTO("username", "password", "Test User", "1990-01-01", "M", "INTJ", "picture", "nickname", false, "file");

        User user = new User();
        user.setUsername(userDTO.getUsername());
        user.setName("Test User");

        when(userService.login(userDTO.getUsername(), userDTO.getPassword())).thenReturn(user);
        when(jwtUtil.generateToken(user.getUsername(), user.getName())).thenReturn("token");

        ResponseEntity<?> response = userController.login(userDTO);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
    }

    @Test
    void testLogin_Failure() {
        UserDTO userDTO = new UserDTO("username", "password", "Test User", "1990-01-01", "M", "INTJ", "picture", "nickname", false, "file");

        when(userService.login(userDTO.getUsername(), userDTO.getPassword())).thenReturn(null);

        ResponseEntity<?> response = userController.login(userDTO);
        assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
    }

    @Test
    void testCheckUsername() {
        String username = "username";

        when(userService.isUserIdInUse(username)).thenReturn(true);

        ResponseEntity<?> response = userController.checkUsername(username);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertTrue((Boolean) response.getBody());
    }

    @Test
    void testCheckNickname() {
        String nickname = "nickname";

        when(userService.isNicknameInUse(nickname)).thenReturn(true);

        ResponseEntity<?> response = userController.checkNickname(nickname);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertTrue((Boolean) response.getBody());
    }
}
