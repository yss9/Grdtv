package proj.travien.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import proj.travien.domain.ChatRoom;
import java.util.Optional;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {
    Optional<ChatRoom> findByRoomId(String roomId);
}
