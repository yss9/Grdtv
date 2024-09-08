package proj.travien.domain;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class PointsHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userId;
    private int pointsChanged; // 변경된 포인트 양
    private String action; // "add" or "deduct"
    private LocalDateTime timestamp;

    // Constructors, getters, and setters
    public PointsHistory(String userId, int pointsChanged, String action) {
        this.userId = userId;
        this.pointsChanged = pointsChanged;
        this.action = action;
        this.timestamp = LocalDateTime.now();
    }

    public PointsHistory() {} // Default constructor
}
