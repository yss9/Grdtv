package proj.travien.repository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import proj.travien.domain.User;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@AutoConfigureTestDatabase(replace = Replace.NONE)
class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @Test
    void testFindByUsername() {
        User user = new User();
        user.setUsername("testuser");
        user.setPassword("password");
        user.setName("Test User");
        user.setDateOfBirth("1990-01-01");
        user.setGender("M");
        user.setMbti("INTJ");
        user.setProfilePicture("picture");
        user.setNickname("testnick");
        user.setAdmin(false);
        user.setVerificationFile("file");

        userRepository.save(user);

        User foundUser = userRepository.findByUsername("testuser");
        assertNotNull(foundUser);
        assertEquals("testuser", foundUser.getUsername());
    }

    @Test
    void testFindByNickname() {
        User user = new User();
        user.setUsername("testuser");
        user.setPassword("password");
        user.setName("Test User");
        user.setDateOfBirth("1990-01-01");
        user.setGender("M");
        user.setMbti("INTJ");
        user.setProfilePicture("picture");
        user.setNickname("testnick");
        user.setAdmin(false);
        user.setVerificationFile("file");

        userRepository.save(user);

        User foundUser = userRepository.findByNickname("testnick");
        assertNotNull(foundUser);
        assertEquals("testnick", foundUser.getNickname());
    }
}
