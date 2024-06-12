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
import proj.travien.domain.User;
import proj.travien.domain.UserChatRoom;
import proj.travien.repository.ChatMessageRepository;
import proj.travien.repository.ChatRoomRepository;
import proj.travien.repository.UserChatRoomRepository;
import proj.travien.repository.UserRepository;

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
    private UserRepository userRepository;

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
        Long id = jwtUtil.extractId(token);
        Optional<ChatRoom> chatRoom = chatRoomRepository.findByRoomId(roomId);
        if (chatRoom.isPresent()) {
            userChatRoomRepository.save(new UserChatRoom(id, chatRoom.get().getId()));
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
    public ResponseEntity<String> createChatRoom(@RequestBody List<String> nicknames) {
        if (nicknames.size() != 2) {
            return new ResponseEntity<>("Invalid number of users", HttpStatus.BAD_REQUEST);
        }

        nicknames.sort(String::compareTo); // 두 사용자 닉네임을 정렬
        String roomId = nicknames.get(0) + "_" + nicknames.get(1); // 고유한 채팅방 번호 생성

        Optional<ChatRoom> existingChatRoom = chatRoomRepository.findByRoomId(roomId);
        if (existingChatRoom.isPresent()) {
            return new ResponseEntity<>(roomId, HttpStatus.OK);
        }

        ChatRoom chatRoom = new ChatRoom();
        chatRoom.setRoomId(roomId);
        chatRoomRepository.save(chatRoom);

        // 닉네임을 ID로 변환하여 저장
        User user1 = userRepository.findByNickname(nicknames.get(0)).orElseThrow(() -> new RuntimeException("User not found"));
        User user2 = userRepository.findByNickname(nicknames.get(1)).orElseThrow(() -> new RuntimeException("User not found"));

        userChatRoomRepository.save(new UserChatRoom(user1.getId(), chatRoom.getId()));
        userChatRoomRepository.save(new UserChatRoom(user2.getId(), chatRoom.getId()));

        return new ResponseEntity<>(roomId, HttpStatus.CREATED);
    }

    @GetMapping(value = "/userRooms", produces = "application/json")
    public ResponseEntity<List<String>> getUserChatRooms(HttpServletRequest request) {
        String token = getTokenFromRequest(request);
        Long id = jwtUtil.extractId(token);
        List<UserChatRoom> userChatRooms = userChatRoomRepository.findByUserId(id);
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
