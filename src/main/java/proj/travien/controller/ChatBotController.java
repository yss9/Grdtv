//package proj.travien.controller;
//import org.springframework.messaging.handler.annotation.MessageMapping;
//import org.springframework.messaging.handler.annotation.SendTo;
//import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
//import org.springframework.stereotype.Controller;
//import proj.travien.dto.ChatMessage;
//
//
//@Controller
//public class ChatBotController {
//
//    @MessageMapping("/chat.sendMessage")
//    @SendTo("/topic/public")
//    public ChatMessage sendMessage(ChatMessage chatMessage) {
//        return chatMessage;
//    }
//
//    @MessageMapping("/chat.addUser")
//    @SendTo("/topic/public")
//    public ChatMessage addUser(ChatMessage chatMessage, SimpMessageHeaderAccessor headerAccessor) {
//        headerAccessor.getSessionAttributes().put("username", chatMessage.getSender());
//        return chatMessage;
//    }
//
//
////    @MessageMapping("/chat")
////    @SendTo("/topic/messages")
////    public ChatMessage sendMessage(@Payload ChatMessage chatMessage){
////        chatMessage.setTimestamp(new Date());
////        return chatMessage;
////    }
//}
//
