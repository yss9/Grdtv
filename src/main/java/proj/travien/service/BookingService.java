package proj.travien.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import proj.travien.domain.Booking;
import proj.travien.domain.User;
import proj.travien.repository.BookingRepository;
import proj.travien.repository.UserRepository;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private UserRepository userRepository; // 유저를 조회하기 위해 추가

    public void updateProgress(String userId, String agentId, int progress) {
        // userId와 agentId로 Booking을 조회하거나 새로 생성
        Optional<Booking> bookingOptional = bookingRepository.findByUser_UserIdAndAgent_UserId(userId, agentId);
        Booking booking;

        if (bookingOptional.isPresent()) {
            // 기존 Booking이 있는 경우
            booking = bookingOptional.get();
        } else {
            // Booking이 없으면 새로 생성
            User user = userRepository.findByUserId(userId).orElseThrow(() -> new RuntimeException("User not found"));
            User agent = userRepository.findByUserId(agentId).orElseThrow(() -> new RuntimeException("Agent not found"));
            booking = new Booking(user, agent, progress);
        }

        // 진행도 업데이트
        booking.setProgress(progress);
        bookingRepository.save(booking);

        // 양방향 관계를 위해 reverse(반대) Booking도 업데이트
        Optional<Booking> reverseBookingOptional = bookingRepository.findByUser_UserIdAndAgent_UserId(agentId, userId);

        if (reverseBookingOptional.isPresent()) {
            Booking reverseBooking = reverseBookingOptional.get();
            reverseBooking.setProgress(progress);
            bookingRepository.save(reverseBooking);
        } else {
            // 반대 Booking이 없으면 생성
            User agentUser = userRepository.findByUserId(agentId).orElseThrow(() -> new RuntimeException("Agent not found"));
            User normalUser = userRepository.findByUserId(userId).orElseThrow(() -> new RuntimeException("User not found"));
            Booking reverseBooking = new Booking(agentUser, normalUser, progress);
            bookingRepository.save(reverseBooking);
        }
    }

    public int getProgress(String userId, String agentId) {
        return bookingRepository.findByUser_UserIdAndAgent_UserId(userId, agentId)
                .map(Booking::getProgress)
                .orElse(0);  // 예약이 존재하지 않으면 0 반환
    }

    public List<Booking> getAllProgress(String userId) {
        return bookingRepository.findAllByUser_UserIdOrAgent_UserId(userId, userId);
    }

    public List<Booking> getAllUniqueProgress(String userId) {
        List<Booking> bookings = bookingRepository.findAllByUser_UserIdOrAgent_UserId(userId, userId);

        // user-agent 쌍의 중복 제거 (userId와 agentId의 조합을 키로 사용)
        Map<String, Booking> uniqueBookings = bookings.stream()
                .filter(booking -> booking.getProgress() > 0) // 진행도가 0보다 큰 것만
                .collect(Collectors.toMap(
                        booking -> generateBookingKey(booking.getUser().getUserId(), booking.getAgent().getUserId()),
                        booking -> booking,
                        (existing, replacement) -> existing // 중복되는 경우 기존 값을 유지
                ));

        return uniqueBookings.values().stream().collect(Collectors.toList());
    }

    // userId와 agentId를 조합하여 유니크한 키를 생성하는 헬퍼 메서드
    private String generateBookingKey(String userId, String agentId) {
        if (userId.compareTo(agentId) < 0) {
            return userId + "_" + agentId;
        } else {
            return agentId + "_" + userId;
        }
    }
}
