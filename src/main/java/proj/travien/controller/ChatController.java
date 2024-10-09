package proj.travien.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import proj.travien.domain.ChatMessage;
import proj.travien.domain.ChatRoom;
import proj.travien.domain.User;
import proj.travien.domain.UserChatRoom;
import proj.travien.jwt.JwtUtil;
import proj.travien.repository.ChatMessageRepository;
import proj.travien.repository.ChatRoomRepository;
import proj.travien.repository.UserChatRoomRepository;
import proj.travien.repository.UserRepository;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/chat")
public class ChatController {

    @Value("${upload.location}")  // application.properties에서 경로 가져오기
    private String uploadDir;

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
        chatRoom.ifPresent(room -> userChatRoomRepository.save(new UserChatRoom(id, room.getId())));

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

    @PostMapping("/uploadFile/{roomId}")
    public ResponseEntity<String> uploadFile(@PathVariable String roomId,
                                             @RequestParam("file") MultipartFile file,
                                             @RequestParam("sender") String sender) {
        if (file.isEmpty()) {
            return new ResponseEntity<>("파일이 없습니다.", HttpStatus.BAD_REQUEST);
        }

        try {
            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            Path path = Paths.get(uploadDir + File.separator + fileName);
            Files.copy(file.getInputStream(), path);

            String fileUrl = "/image/" + fileName; // 업로드된 파일 경로 생성

            return new ResponseEntity<>(fileUrl, HttpStatus.OK); // 파일 경로 반환
        } catch (IOException e) {
            return new ResponseEntity<>("파일 업로드 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private String getTokenFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}
