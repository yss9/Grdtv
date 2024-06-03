package proj.travien.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class DestinationInfo {

    @Id
    private Long id;

    private String country;
    private String location;
    private String destName;
    private String info;

}
