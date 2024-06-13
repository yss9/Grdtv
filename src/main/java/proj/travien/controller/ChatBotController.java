package proj.travien.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;
import proj.travien.dto.ChatMessage;
import proj.travien.service.ChatBotService;
import reactor.core.publisher.Mono;


@Controller
public class ChatBotController {

    @Autowired
    private ChatBotService chatBotService;

    @MessageMapping("/chat.sendMessage")
    @SendTo("/topic/public")
    public Mono<ChatMessage> sendMessage(ChatMessage chatMessage) {
        return chatBotService.getChatResponse(chatMessage.getContent())
                .map(response -> {
                    ChatMessage botMessage = new ChatMessage();
                    botMessage.setSender("ChatBot");
                    botMessage.setContent(response);
                    return botMessage;
                });
    }

    @MessageMapping("/chat.addUser")
    @SendTo("/topic/public")
    public ChatMessage addUser(ChatMessage chatMessage, SimpMessageHeaderAccessor headerAccessor) {
        headerAccessor.getSessionAttributes().put("username", chatMessage.getSender());
        return chatMessage;
    }

}

