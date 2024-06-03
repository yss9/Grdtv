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

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

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
    void testSignUp_EmailAlreadyInUse() {
        UserDTO userDTO = new UserDTO("Test User", "test@example.com", "password");

        when(userService.isEmailInUse(userDTO.getEmail())).thenReturn(true);

        ResponseEntity<?> response = userController.signUp(userDTO);
        assertEquals(HttpStatus.CONFLICT, response.getStatusCode());
    }

    @Test
    void testSignUp_Success() {
        UserDTO userDTO = new UserDTO("Test User", "test@example.com", "password");

        when(userService.isEmailInUse(userDTO.getEmail())).thenReturn(false);
        when(userService.createUser(userDTO)).thenReturn(true);

        ResponseEntity<?> response = userController.signUp(userDTO);
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    void testLogin_Success() {
        UserDTO userDTO = new UserDTO("Test User", "test@example.com", "password");

        User user = new User();
        user.setEmail(userDTO.getEmail());
        user.setName("Test User");

        when(userService.login(userDTO.getEmail(), userDTO.getPassword())).thenReturn(user);
        when(jwtUtil.generateToken(user.getEmail(), user.getName())).thenReturn("token");

        ResponseEntity<?> response = userController.login(userDTO);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
    }

    @Test
    void testLogin_Failure() {
        UserDTO userDTO = new UserDTO("Test User", "test@example.com", "password");

        when(userService.login(userDTO.getEmail(), userDTO.getPassword())).thenReturn(null);

        ResponseEntity<?> response = userController.login(userDTO);
        assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
    }

    @Test
    void testCheckEmail() {
        String email = "test@example.com";

        when(userService.checkEmailExistence(email)).thenReturn(true);

        ResponseEntity<?> response = userController.checkEmail(email);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertTrue((Boolean) response.getBody());
    }
}
