package proj.travien.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import proj.travien.domain.Navigation;
import proj.travien.repository.NavigationRepository;

import java.util.List;

@Service
public class NavigationService {

    private final NavigationRepository navigationRepository;

    public NavigationService(NavigationRepository navigationRepository) {
        this.navigationRepository = navigationRepository;
    }

    @Transactional
    public Navigation saveNavigation(List<String> locations) {
        if (locations.size() < 2 || locations.size() > 10) {
            throw new IllegalArgumentException("Number of locations must be between 2 and 10.");
        }

        Navigation navigation = new Navigation(locations);
        return navigationRepository.save(navigation);
    }
}
