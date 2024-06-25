package proj.travien.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import proj.travien.domain.UserInfo;

public interface UserInfoRepository extends JpaRepository<UserInfo, Long> {
}
