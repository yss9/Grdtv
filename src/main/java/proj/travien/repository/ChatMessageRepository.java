package proj.travien.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import proj.travien.domain.ChatMessage;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
    List<ChatMessage> findByRoomId(String roomId);
}
