package proj.travien.repository;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import proj.travien.domain.User;

import java.util.List;

@SpringBootTest
class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @BeforeEach
    public void cleanup() {
        userRepository.deleteAll();
    }

    @Test
    void 회원가입_로그인() {
        // given
        String email = "test@test.com";
        String password = "1234";
        String name = "test";

        userRepository.save(User.builder()
                .email(email)
                .password(password)
                .name(name)
                .build());

        // when
        List<User> userList = userRepository.findAll();

        // then
        User user = userList.get(0);
        System.out.println(user);
        System.out.println("ID: " + user.getId());
        System.out.println("Email: " + user.getEmail());
        System.out.println("Password: " + user.getPassword());
        System.out.println("Name: " + user.getName());
        Assertions.assertEquals(email, user.getEmail());
        Assertions.assertEquals(name, user.getName());

        //로그인
        email = "test@test.com";
        password = "1234";

        User foundUser = userRepository.findByEmailAndPassword(email, password);
        System.out.println("login id= " + foundUser.getId());

        Assertions.assertNotNull(foundUser);
    }
}

