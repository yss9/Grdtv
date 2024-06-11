package proj.travien.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import proj.travien.domain.Place;
import proj.travien.dto.PlaceRequest;
import proj.travien.service.PlaceService;

import java.util.List;

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
}
