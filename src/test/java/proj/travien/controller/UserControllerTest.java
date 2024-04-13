package proj.travien.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.*;
import static org.mockito.BDDMockito.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import proj.travien.JwtUtil;
import proj.travien.domain.User;
import proj.travien.dto.UserDTO;
import proj.travien.exception.EmailAlreadyUsedException;
import proj.travien.service.UserService;

@WebMvcTest(UserController.class)
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @MockBean
    private JwtUtil jwtUtil;

    private String email;
    private String password;
    private User user;
    private String fakeToken;

    @BeforeEach
    void setUp() {
        email = "user@example.com";
        password = "password123";
        fakeToken = "fake.jwt.token";
        user = User.builder()
                .email(email)
                .password(password)
                .name("example")
                .build();
    }

    @Test
    void SignUp_ThrowsConflict() throws Exception {
        given(userService.createUser(any(UserDTO.class))).willThrow(new EmailAlreadyUsedException("Email already in use"));
        mockMvc.perform(post("/api/users/signup")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"email\":\"" + email + "\",\"password\":\"" + password + "\"}"))
                .andExpect(status().isConflict());
    }

    @Test
    void SignUp_Success() throws Exception {
        mockMvc.perform(post("/api/users/signup")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"email\":\"" + email + "\",\"password\":\"" + password + "\"}"))
                .andExpect(status().isOk());
    }

    @Test
    void Login_Success() throws Exception {
        given(userService.login(email, password)).willReturn(user);
        given(jwtUtil.generateToken(email)).willReturn(fakeToken);

        mockMvc.perform(post("/api/users/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"email\":\"" + email + "\",\"password\":\"" + password + "\"}"))
                .andExpect(status().isOk())
                .andExpect(content().string(fakeToken));
    }

    @Test
    void Login_Unauthorized() throws Exception {
        given(userService.login(anyString(), anyString())).willReturn(null);
        mockMvc.perform(post("/api/users/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"email\":\"" + email + "\",\"password\":\"" + password + "\"}"))
                .andExpect(status().isUnauthorized());
    }
}