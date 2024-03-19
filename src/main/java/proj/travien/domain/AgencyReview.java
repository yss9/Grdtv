package proj.travien.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@NoArgsConstructor
@Getter
@Setter
@Entity
public class AgencyReview {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "agency_id")
    private AgencyInfo agency;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private Double rating;
    private String review;

}
