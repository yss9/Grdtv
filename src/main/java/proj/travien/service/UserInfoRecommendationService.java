package proj.travien.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import proj.travien.domain.UserInfo;
import proj.travien.repository.UserInfoRepository;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
public class UserInfoRecommendationService {

    @Autowired
    private UserInfoRepository userInfoRepository;

    private static final double MAX_AGE = 100.0;

    public List<UserInfo> getSimilarUsers(UserInfo newUser) {
        List<UserInfo> users = userInfoRepository.findAll();
        List<UserSimilarity> similarities = new ArrayList<>();
        double[] newUserVector = convertToVector(newUser);

        for (UserInfo user : users) {
            double[] userVector = convertToVector(user);
            double similarity = cosineSimilarity(newUserVector, userVector);
            similarities.add(new UserSimilarity(user, similarity));
        }

        similarities.sort(Comparator.comparingDouble(UserSimilarity::getSimilarity).reversed());

        List<UserInfo> SimilarUsers = new ArrayList<>();
        for (int i = 0; i < Math.min(12, similarities.size()); i++) {
            SimilarUsers.add(similarities.get(i).getUser());
        }

        return SimilarUsers;
    }

    private double[] convertToVector(UserInfo user) {
        double[] vector = new double[7];

        vector[0] = user.getAge() / MAX_AGE;
        vector[1] = user.getGender().equals("M") ? 0 : 1;
        vector[2] = user.getMbti().charAt(0) == 'E' ? 0 : 1;
        vector[3] = user.getMbti().charAt(1) == 'S' ? 0 : 1;
        vector[4] = user.getMbti().charAt(2) == 'T' ? 0 : 1;
        vector[5] = user.getMbti().charAt(3) == 'J' ? 0 : 1;

        return vector;
    }

    private double cosineSimilarity(double[] vec1, double[] vec2) {
        double dotProduct = 0.0;
        double magnitude1 = 0.0;
        double magnitude2 = 0.0;

        for (int i = 0; i < vec1.length; i++) {
            dotProduct += vec1[i] * vec2[i];
            magnitude1 += Math.pow(vec1[i], 2);
            magnitude2 += Math.pow(vec2[i], 2);
        }

        magnitude1 = Math.sqrt(magnitude1);
        magnitude2 = Math.sqrt(magnitude2);

        if (magnitude1 == 0 || magnitude2 == 0) {
            return 0;
        }

        return dotProduct / (magnitude1 * magnitude2);
    }

    private class UserSimilarity {
        private UserInfo user;
        private double similarity;

        public UserSimilarity(UserInfo user, double similarity) {
            this.user = user;
            this.similarity = similarity;
        }

        public UserInfo getUser() {
            return user;
        }

        public double getSimilarity() {
            return similarity;
        }
    }

}
