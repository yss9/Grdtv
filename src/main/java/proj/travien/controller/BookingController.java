package proj.travien.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import proj.travien.domain.Booking;
import proj.travien.dto.BookingDTO;
import proj.travien.service.BookingService;

import java.util.Collections;
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
    public ResponseEntity<List<Map<String, Object>>> getAllProgress(@RequestParam String userId) {
        List<Booking> bookings = bookingService.getAllUniqueProgress(userId);

        List<Map<String, Object>> result = bookings.stream().map(booking -> {
            Map<String, Object> map = new HashMap<>();
            map.put("userNickname", booking.getUser().getNickname());
            map.put("agentNickname", booking.getAgent().getNickname());
            map.put("progress", booking.getProgress());
            return map;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(result);
    }
}