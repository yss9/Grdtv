package proj.travien.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import proj.travien.jwt.JwtUtil;
import proj.travien.dto.ChatMessage;
import proj.travien.service.ChatBotService;
import reactor.core.publisher.Mono;

@Controller
public class ChatBotController {

    @Autowired
    private ChatBotService chatBotService;

    @Autowired
    private JwtUtil jwtUtil;

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
    public ChatMessage addUser(ChatMessage chatMessage) {
        String token = chatMessage.getToken();
        if (token == null || !token.startsWith("Bearer ")) {
            throw new NullPointerException("JWT token is null");
        }

        String jwtToken = token.substring(7); // "Bearer " 부분 제거
        String nickname = jwtUtil.extractNickname(jwtToken);
        chatMessage.setSender(nickname);

        return chatMessage;
    }
}
