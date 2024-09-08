package proj.travien;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import proj.travien.domain.User;
import proj.travien.repository.UserRepository;

import java.util.Set;

@Component
public class AdminAccountInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // 관리자 계정이 없을 때만 생성
        if (userRepository.findByUserId("admin").isEmpty()) {
            User admin = new User();
            admin.setUserId("admin");
            admin.setPassword(BCrypt.hashpw("admin1234", BCrypt.gensalt()));
            admin.setName("Administrator");
            admin.setRoles(Set.of("ROLE_ADMIN"));
            admin.setPoints(1000);

            userRepository.save(admin);
            System.out.println("Admin account created");
        }
    }
}
