package proj.travien.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import proj.travien.domain.Booking;
import proj.travien.domain.User;
import proj.travien.repository.BookingRepository;
import proj.travien.repository.UserRepository;

import java.util.ArrayList;
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

    public void updateProgress(String userNickname, String agentNickname, int progress) {
        // userNickname과 agentNickname으로 Booking을 조회하거나 새로 생성
        Optional<Booking> bookingOptional = bookingRepository.findByUser_NicknameAndAgent_Nickname(userNickname, agentNickname);
        Booking booking;

        if (bookingOptional.isPresent()) {
            // 기존 Booking이 있는 경우
            booking = bookingOptional.get();
        } else {
            // Booking이 없으면 새로 생성
            User user = userRepository.findByNickname(userNickname).orElseThrow(() -> new RuntimeException("User not found"));
            User agent = userRepository.findByNickname(agentNickname).orElseThrow(() -> new RuntimeException("Agent not found"));
            booking = new Booking(user, agent, progress);
        }

        // 진행도 업데이트
        booking.setProgress(progress);
        bookingRepository.save(booking);

        // 양방향 관계를 위해 reverse(반대) Booking도 업데이트
        Optional<Booking> reverseBookingOptional = bookingRepository.findByUser_NicknameAndAgent_Nickname(agentNickname, userNickname);

        if (reverseBookingOptional.isPresent()) {
            Booking reverseBooking = reverseBookingOptional.get();
            reverseBooking.setProgress(progress);
            bookingRepository.save(reverseBooking);
        } else {
            // 반대 Booking이 없으면 생성
            User agentUser = userRepository.findByNickname(agentNickname).orElseThrow(() -> new RuntimeException("Agent not found"));
            User normalUser = userRepository.findByNickname(userNickname).orElseThrow(() -> new RuntimeException("User not found"));
            Booking reverseBooking = new Booking(agentUser, normalUser, progress);
            bookingRepository.save(reverseBooking);
        }
    }

    public int getProgress(String userNickname, String agentNickname) {
        return bookingRepository.findByUser_NicknameAndAgent_Nickname(userNickname, agentNickname)
                .map(Booking::getProgress)
                .orElse(0);  // 예약이 존재하지 않으면 0 반환
    }

    public List<Booking> getAllUniqueProgress(String userNickname) {
        List<Booking> bookings = bookingRepository.findAllByUser_NicknameOrAgent_Nickname(userNickname, userNickname);

        // user-agent 쌍의 중복 제거 (userNickname과 agentNickname의 조합을 키로 사용)
        Map<String, Booking> uniqueBookings = bookings.stream()
                .filter(booking -> booking.getProgress() > 0) // 진행도가 0보다 큰 것만
                .collect(Collectors.toMap(
                        booking -> generateBookingKey(booking.getUser().getNickname(), booking.getAgent().getNickname()),
                        booking -> booking,
                        (existing, replacement) -> existing // 중복되는 경우 기존 값을 유지
                ));

        return new ArrayList<>(uniqueBookings.values());
    }

    public boolean setSendedStatus(String userNickname, String agentNickname, boolean status) {
        Booking booking = bookingRepository.findByUser_NicknameAndAgent_Nickname(userNickname, agentNickname)
                .orElseThrow(() -> new IllegalArgumentException("Booking not found"));
        booking.setSended(status);
        bookingRepository.save(booking);
        return true;
    }

    public Boolean checkSendedStatus(String userNickname, String agentNickname) {
        return bookingRepository.findByUser_NicknameAndAgent_Nickname(userNickname, agentNickname)
                .map(Booking::isSended)
                .orElse(null); // null 반환 시 NOT_FOUND
    }

    // userNickname과 agentNickname을 조합하여 유니크한 키를 생성하는 헬퍼 메서드
    private String generateBookingKey(String userNickname, String agentNickname) {
        if (userNickname.compareTo(agentNickname) < 0) {
            return userNickname + "_" + agentNickname;
        } else {
            return agentNickname + "_" + userNickname;
        }
    }
}
