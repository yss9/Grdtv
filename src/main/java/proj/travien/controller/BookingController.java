package proj.travien.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import proj.travien.domain.Booking;
import proj.travien.service.BookingService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/booking")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping("/update-progress")
    public ResponseEntity<Void> updateProgress(@RequestParam String userId,
                                               @RequestParam String agentId,
                                               @RequestParam int progress) {
        bookingService.updateProgress(userId, agentId, progress);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/progress")
    public ResponseEntity<Integer> getProgress(@RequestParam String userId,
                                               @RequestParam String agentId) {
        int progress = bookingService.getProgress(userId, agentId);
        return ResponseEntity.ok(progress);
    }

    @GetMapping("/all-progress")
    public ResponseEntity<List<Map<String, Object>>> getAllProgress(@RequestParam String nickname) {
        List<Booking> bookings = bookingService.getAllUniqueProgress(nickname);

        List<Map<String, Object>> result = bookings.stream().map(booking -> {
            Map<String, Object> map = new HashMap<>();
            map.put("userNickname", booking.getUser().getNickname());
            map.put("agentNickname", booking.getAgent().getNickname());
            map.put("progress", booking.getProgress());
            return map;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(result);
    }

    // isSended 값을 true로 설정하는 API
    @PostMapping("/set-sended")
    public ResponseEntity<Void> setSended(@RequestBody Map<String, String> request) {
        String userNickname = request.get("userNickname");
        String agentNickname = request.get("agentNickname");

        boolean updated = bookingService.setSendedStatus(userNickname, agentNickname, true);
        if (updated) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }


    // 현재 isSended 값을 조회하는 API
    @GetMapping("/check-sended")
    public ResponseEntity<Boolean> checkSended(@RequestParam String userNickname, @RequestParam String agentNickname) {
        Boolean isSended = bookingService.checkSendedStatus(userNickname, agentNickname);
        if (isSended != null) {
            return ResponseEntity.ok(isSended);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
}