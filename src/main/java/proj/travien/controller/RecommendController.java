package proj.travien.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import proj.travien.domain.MyRoute;
import proj.travien.domain.UserInfo;
import proj.travien.dto.KeywordRequest;
import proj.travien.dto.KeywordResultDTO;
import proj.travien.dto.MyRouteDTO;
import proj.travien.service.KeywordRecommendService;
import proj.travien.service.MyRouteService;
import proj.travien.service.UserInfoRecommendationService;

import java.util.List;

@RestController
@RequestMapping("/api")
public class RecommendController {

    @Autowired
    private KeywordRecommendService keywordRecommendService;

    @Autowired
    private UserInfoRecommendationService userInfoRecommendationService;

    @Autowired
    private MyRouteService myRouteService;

    @PostMapping("/search")
    public List<KeywordResultDTO> search(@RequestBody KeywordRequest keywordRequest) {
        return keywordRecommendService.searchByKeywords(keywordRequest.getKeywords());
    }

    @PostMapping("/info-recommend")
    public List<UserInfo> getRecommendations(@RequestBody UserInfo user){
        return userInfoRecommendationService.getSimilarUsers(user);
    }

    @PostMapping("/save-route")
    public MyRoute saveRoute(@RequestBody MyRouteDTO myRoute){
        return myRouteService.saveMyRoute(myRoute);
    }

    @GetMapping("/get-routes")
    public List<UserInfo> getMyRoutes(@RequestParam("userId") Long userId){
        return myRouteService.getMyRoutes(userId);
    }

}
