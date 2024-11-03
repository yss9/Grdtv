package proj.travien.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.AllArgsConstructor;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class AgentApplicationDTO {
    private String agentCountry; // 대행 국가
    private String introduction; // 소개문구
    private List<String> hashtags; // 해시태그 목록
    private String specIntroduction; // 스펙 소개글
    private double averageReviewRating; // 리뷰 별점 평균
}
