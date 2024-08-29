package proj.travien.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import proj.travien.domain.Addresses;

import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AddressResponseDto {
    private String addressTitle;
    private Set<Addresses> addresses;
    private Long boardID;  // 추가된 필드

}
