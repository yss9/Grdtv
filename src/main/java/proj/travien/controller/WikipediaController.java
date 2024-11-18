package proj.travien.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
public class WikipediaController {

    @GetMapping("/api/wikipedia")
    public String searchWikipedia(@RequestParam String query) {
        String apiUrl = "https://ko.wikipedia.org/w/api.php?action=query&list=search&srsearch="
                + query + "&format=json";

        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(apiUrl, String.class);
    }
}
