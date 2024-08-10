package proj.travien.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Follow {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user; // 팔로우하는 사용자

    @ManyToOne
    @JoinColumn(name = "agent_id")
    private User agent; // 팔로우되는 대행자

    // Constructor, getters and setters
}
