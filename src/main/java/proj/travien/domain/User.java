package proj.travien.domain;

import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@NoArgsConstructor
@Getter
@Setter
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;
    private String password;
    private String name;
    private Boolean agencyAuthority;
    private Integer points;

    @OneToMany(mappedBy = "user")
    private Set<Like> likes = new HashSet<>();
}
