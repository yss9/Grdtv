package proj.travien.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;
import proj.travien.JwtUtil;
import proj.travien.domain.ChatMessage;
import proj.travien.domain.ChatRoom;
import proj.travien.domain.UserChatRoom;
import proj.travien.repository.ChatMessageRepository;
import proj.travien.repository.ChatRoomRepository;
import proj.travien.repository.UserChatRoomRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/chat")
public class ChatController {

    @Autowired
    private ChatMessageRepository chatMessageRepository;

    @Autowired
    private ChatRoomRepository chatRoomRepository;

    @Autowired
    private UserChatRoomRepository userChatRoomRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @MessageMapping("/chat.sendMessage/{roomId}")
    @SendTo("/topic/public/{roomId}")
    public ChatMessage sendMessage(@DestinationVariable String roomId, ChatMessage chatMessage) {
        chatMessage.setRoomId(roomId);
        chatMessageRepository.save(chatMessage);
        return chatMessage;
    }

    @MessageMapping("/chat.addUser/{roomId}")
    @SendTo("/topic/public/{roomId}")
    public ChatMessage addUser(@DestinationVariable String roomId, ChatMessage chatMessage, HttpServletRequest request) {
        String token = getTokenFromRequest(request);
        String nickname = jwtUtil.extractNickname(token);
        chatMessage.setSender(nickname);
        chatMessage.setType(ChatMessage.MessageType.JOIN);
        chatMessage.setRoomId(roomId);
        chatMessageRepository.save(chatMessage);

        // 사용자 채팅방 관계 저장
        Long userId = jwtUtil.extractId(token);
        Optional<ChatRoom> chatRoom = chatRoomRepository.findByRoomId(roomId);
        if (chatRoom.isPresent()) {
            userChatRoomRepository.save(new UserChatRoom(userId, chatRoom.get().getId()));
        }

        return chatMessage;
    }

    @GetMapping(value = "/history/{roomId}", produces = "application/json")
    public ResponseEntity<List<ChatMessage>> getChatHistory(@PathVariable String roomId) {
        List<ChatMessage> chatMessages = chatMessageRepository.findByRoomId(roomId);
        if (chatMessages.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(chatMessages, HttpStatus.OK);
    }

    @PostMapping(value = "/createRoom", produces = "application/json")
    public ResponseEntity<String> createChatRoom(@RequestBody List<Long> userIds) {
        if (userIds.size() != 2) {
            return new ResponseEntity<>("Invalid number of users", HttpStatus.BAD_REQUEST);
        }

        userIds.sort(Long::compareTo);
        String roomId = userIds.get(0) + "_" + userIds.get(1);

        Optional<ChatRoom> existingChatRoom = chatRoomRepository.findByRoomId(roomId);
        if (existingChatRoom.isPresent()) {
            return new ResponseEntity<>(roomId, HttpStatus.OK);
        }

        ChatRoom chatRoom = new ChatRoom();
        chatRoom.setRoomId(roomId);
        chatRoomRepository.save(chatRoom);

        for (Long userId : userIds) {
            userChatRoomRepository.save(new UserChatRoom(userId, chatRoom.getId()));
        }

        return new ResponseEntity<>(roomId, HttpStatus.CREATED);
    }

    @GetMapping(value = "/userRooms", produces = "application/json")
    public ResponseEntity<List<String>> getUserChatRooms(HttpServletRequest request) {
        String token = getTokenFromRequest(request);
        Long userId = jwtUtil.extractId(token);
        List<UserChatRoom> userChatRooms = userChatRoomRepository.findByUserId(userId);
        List<String> roomIds = userChatRooms.stream()
                .map(userChatRoom -> chatRoomRepository.findById(userChatRoom.getChatRoomId()).get().getRoomId())
                .collect(Collectors.toList());

        return new ResponseEntity<>(roomIds, HttpStatus.OK);
    }

    private String getTokenFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}
