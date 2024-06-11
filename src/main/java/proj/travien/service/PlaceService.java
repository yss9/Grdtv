package proj.travien.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import proj.travien.domain.Place;
import proj.travien.dto.PlaceRequest;
import proj.travien.repository.PlaceRepository;

import java.util.List;
import java.util.stream.Collectors;

import java.util.List;

@Service
public class PlaceService {
    @Autowired
    private PlaceRepository placeRepository;

    @Transactional
    public List<Place> savePlaces(List<PlaceRequest.PlaceDto> placeDtos) {
        List<Place> places = placeDtos.stream()
                .map(dto -> new Place(dto.getName(), dto.getAddress()))
                .collect(Collectors.toList());
        return placeRepository.saveAll(places);
    }

    @Transactional(readOnly = true)
    public List<Place> getAllPlaces() {
        return placeRepository.findAll();
    }
}
