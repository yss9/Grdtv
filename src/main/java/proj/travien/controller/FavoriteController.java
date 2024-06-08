package proj.travien.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import proj.travien.dto.FavoriteResponse;
import proj.travien.service.FavoriteService;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@RestController
public class FavoriteController {

    private final FavoriteService favoriteService;

    @PostMapping("/api/favorites")
    public ResponseEntity<Void> addFavorite(@RequestParam Long postId) {
        favoriteService.addFavorite(postId);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping("/api/favorites")
    public ResponseEntity<List<FavoriteResponse>> getAllFavorites() {
        List<FavoriteResponse> favorites = favoriteService.getAllFavorites()
                .stream()
                .map(FavoriteResponse::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok().body(favorites);
    }


    @DeleteMapping("/api/favorites/{id}")
    public ResponseEntity<Void> removeFavorite(@PathVariable Long id) {
        favoriteService.removeFavorite(id);
        return ResponseEntity.ok().build();
    }
}
