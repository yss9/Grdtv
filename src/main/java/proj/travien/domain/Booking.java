package proj.travien.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user; // 예약을 진행 중인 사용자

    @ManyToOne
    @JoinColumn(name = "agent_id")
    private User agent; // 예약을 진행 중인 대행자

    @Column(nullable = false)
    private int progress = 1; // 예약 진행도 (1, 2, 3, 4)

    // 기본 생성자
    public Booking() {
    }

    // 전체 필드를 포함하는 생성자
    public Booking(User user, User agent, int progress) {
        this.user = user;
        this.agent = agent;
        this.progress = progress;
    }

    // Getter 및 Setter는 Lombok의 @Getter, @Setter에 의해 자동으로 생성됨
}
