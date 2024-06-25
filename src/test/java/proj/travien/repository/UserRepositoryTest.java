package proj.travien.repository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import proj.travien.domain.User;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @Test
    public void testFindByUserId() {
        User user = new User();
        user.setUserId("testuser");
        userRepository.save(user);

        Optional<User> foundUser = userRepository.findByUserId("testuser");
        assertTrue(foundUser.isPresent());
        assertEquals("testuser", foundUser.get().getUserId());
    }

    @Test
    public void testFindByNickname() {
        User user = new User();
        user.setNickname("testnick");
        userRepository.save(user);

        Optional<User> foundUser = userRepository.findByNickname("testnick");
        assertTrue(foundUser.isPresent());
        assertEquals("testnick", foundUser.get().getNickname());
    }
}
