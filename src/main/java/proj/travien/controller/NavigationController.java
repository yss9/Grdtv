package proj.travien.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import proj.travien.domain.Navigation;
import proj.travien.service.NavigationService;

import java.util.List;

@RestController
@RequestMapping("/api/navigations")
@CrossOrigin(origins = "http://localhost:3000")
public class NavigationController {

    private final NavigationService navigationService;

    public NavigationController(NavigationService navigationService) {
        this.navigationService = navigationService;
    }

    @PostMapping
    public ResponseEntity<Navigation> createNavigation(@RequestBody List<String> locations) {
        if (locations.size() < 2 || locations.size() > 10) {
            return ResponseEntity.badRequest().build();
        }

        Navigation navigation = navigationService.saveNavigation(locations);
        return ResponseEntity.ok(navigation);
    }
}
