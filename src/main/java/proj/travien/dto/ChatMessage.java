package proj.travien.dto;

import lombok.*;

import java.util.Date;

@Getter
@Setter
public class ChatMessage {
    private MessageType type;
    private String content;
    private String sender;

    public enum MessageType {
        CHAT,
        JOIN,
        LEAVE
    }

    // Getters and Setters
}
