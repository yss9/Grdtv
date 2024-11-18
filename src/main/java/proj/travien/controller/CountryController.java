package proj.travien.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
public class CountryController {

    @GetMapping("/api/country-info")
    public String getCountryExtractHtml(@RequestParam String country) {
        String apiUrl = "https://ko.wikipedia.org/api/rest_v1/page/summary/" + country;

        RestTemplate restTemplate = new RestTemplate();
        String response = restTemplate.getForObject(apiUrl, String.class);

        try {
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode rootNode = objectMapper.readTree(response);

            return rootNode.path("extract_html").asText(); // extractHtml만 반환

        } catch (Exception e) {
            e.printStackTrace();
            return "Error parsing response";
        }
    }
}
