package proj.travien.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import proj.travien.dto.KeywordRequest;
import proj.travien.dto.KeywordResultDTO;
import proj.travien.service.KeywordRecommendService;

import java.util.List;

@RestController
@RequestMapping("/api")
public class RecommendController {

    @Autowired
    private KeywordRecommendService keywordRecommendService;

    @PostMapping("/search")
    public List<KeywordResultDTO> search(@RequestBody KeywordRequest keywordRequest) {
        return keywordRecommendService.searchByKeywords(keywordRequest.getKeywords());
    }

}
