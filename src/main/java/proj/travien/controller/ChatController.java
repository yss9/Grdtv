package proj.travien.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import proj.travien.domain.ChatMessage;
import proj.travien.repository.ChatMessageRepository;

import java.util.List;

@Controller
@RequestMapping("/chat")
public class ChatController {

    private ChatMessageRepository chatMessageRepository;

    @MessageMapping("/chat.sendMessage/{roomId}")
    @SendTo("/topic/public/{roomId}")
    public ChatMessage sendMessage(@DestinationVariable String roomId, ChatMessage chatMessage) {
        chatMessage.setRoomId(roomId);
        chatMessageRepository.save(chatMessage);
        return chatMessage;
    }

    @MessageMapping("/chat.addUser/{roomId}")
    @SendTo("/topic/public/{roomId}")
    public ChatMessage addUser(@DestinationVariable String roomId, ChatMessage chatMessage) {
        chatMessage.setType(ChatMessage.MessageType.JOIN);
        chatMessage.setRoomId(roomId);
        chatMessageRepository.save(chatMessage);
        return chatMessage;
    }

    @GetMapping(value = "/history/{roomId}", produces = "application/json")
    public List<ChatMessage> getChatHistory(@PathVariable String roomId) {
        return chatMessageRepository.findByRoomId(roomId);
    }
}
