package proj.travien.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import proj.travien.domain.DestinationInfo;
import proj.travien.dto.KeywordResultDTO;
import proj.travien.repository.DestinationInfoRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class KeywordRecommendService {

    @Autowired
    private DestinationInfoRepository repository;

    public List<KeywordResultDTO> searchByKeywords(List<String> keywords) {
        return repository.findAll().stream()
                .filter(entity -> containsAnyKeyword(entity.getInfo(), keywords))
                .sorted((e1, e2) -> Integer.compare(
                        countMatchingKeywords(e2.getInfo(), keywords),
                        countMatchingKeywords(e1.getInfo(), keywords)))
                .map(this::convertToDTO)
                .limit(21)
                .collect(Collectors.toList());
    }

    private boolean containsAnyKeyword(String description, List<String> keywords) {
        return keywords.stream().anyMatch(description::contains);
    }

    private int countMatchingKeywords(String description, List<String> keywords) {
        return (int) keywords.stream().filter(description::contains).count();
    }

    private KeywordResultDTO convertToDTO(DestinationInfo entity) {
        KeywordResultDTO dto = new KeywordResultDTO();
        dto.setId(entity.getId());
        dto.setDestName(entity.getDestName());
        dto.setCountry(entity.getCountry());
        dto.setLocation(entity.getLocation());
        dto.setInfo(entity.getInfo());
        return dto;
    }

}

