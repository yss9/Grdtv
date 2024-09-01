package proj.travien.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import proj.travien.domain.Place;
import proj.travien.dto.PlaceRequest;
import proj.travien.service.PlaceService;

import java.util.List;
import java.util.Map;

@RestController
public class PlaceController {
    @Autowired
    private PlaceService placeService;

    @PostMapping("/api/places")
    public ResponseEntity<List<Place>> savePlaces(@RequestBody PlaceRequest placeRequest) {
        List<Place> savedPlaces = placeService.savePlaces(placeRequest.getPlaces());
        return new ResponseEntity<>(savedPlaces, HttpStatus.CREATED);
    }

    @GetMapping("/api/places")
    public ResponseEntity<List<Place>> getPlaces() {
        List<Place> places = placeService.getAllPlaces();
        return new ResponseEntity<>(places, HttpStatus.OK);
    }

    private static final String API_KEY = "AIzaSyAN_d6a4icKZwbfJCbfyFuWeAKVGQWfRK4";

    @GetMapping("/api/search-place")
    public Map<String, Object> searchPlace(@RequestParam String query, @RequestParam String country) {
        String url = "https://maps.googleapis.com/maps/api/place/textsearch/json?query="
                + query + "&region=" + country + "&key=" + API_KEY;

        RestTemplate restTemplate = new RestTemplate();
        Map<String, Object> response = restTemplate.getForObject(url, Map.class);

        return response; // JSON 형태로 프론트엔드에 반환
    }
}
