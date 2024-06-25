package proj.travien.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import proj.travien.domain.UserInfo;
import proj.travien.dto.KeywordRequest;
import proj.travien.dto.KeywordResultDTO;
import proj.travien.service.KeywordRecommendService;
import proj.travien.service.UserInfoRecommendationService;

import java.util.List;

@RestController
@RequestMapping("/api")
public class RecommendController {

    @Autowired
    private KeywordRecommendService keywordRecommendService;

    @Autowired
    private UserInfoRecommendationService userInfoRecommendationService;

    @PostMapping("/search")
    public List<KeywordResultDTO> search(@RequestBody KeywordRequest keywordRequest) {
        return keywordRecommendService.searchByKeywords(keywordRequest.getKeywords());
    }

    @PostMapping("/info-recommend")
    public List<UserInfo> getRecommendations(@RequestBody UserInfo user){
        return userInfoRecommendationService.getSimilarUsers(user);
    }

}
