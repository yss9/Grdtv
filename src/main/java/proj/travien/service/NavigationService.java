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
            throw new IllegalArgumentException("위치의 개수는 2개 이상 10개 이하여야 합니다.");
        }

        Navigation navigation = new Navigation(locations);
        return navigationRepository.save(navigation);
    }

    @Transactional(readOnly = true)
    public List<Navigation> getAllNavigations() {
        return navigationRepository.findAll();
    }
}
