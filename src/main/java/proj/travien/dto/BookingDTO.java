package proj.travien.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class BookingDTO {
    private String agentId;
    private String agentName;
    private int progress;
}

