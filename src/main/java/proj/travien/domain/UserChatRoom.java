package proj.travien.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class UserChatRoom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long userId;
    private Long chatRoomId;

    public UserChatRoom() {}

    public UserChatRoom(Long userId, Long chatRoomId) {
        this.userId = userId;
        this.chatRoomId = chatRoomId;
    }
}
