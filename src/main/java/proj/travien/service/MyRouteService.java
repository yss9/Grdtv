package proj.travien.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import proj.travien.domain.MyRoute;
import proj.travien.domain.UserInfo;
import proj.travien.dto.MyRouteDTO;
import proj.travien.repository.MyRouteRepository;
import proj.travien.repository.UserInfoRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MyRouteService {

    @Autowired
    private MyRouteRepository myRouteRepository;

    @Autowired
    private UserInfoRepository userInfoRepository;

    public List<UserInfo> getMyRoutes(Long userId) {
        List<MyRoute> myRoutes = myRouteRepository.findAllByUserId(userId);

        List<Long> userInfoIds = myRoutes.stream()
                .map(MyRoute::getUserInfoId)
                .collect(Collectors.toList());

        // 3. userInfoIds에 해당하는 UserInfo 엔티티들을 조회
        List<UserInfo> userInfos = userInfoRepository.findAllById(userInfoIds);

        // 4. 조회한 UserInfo 리스트 반환
        return userInfos;
    }


    public MyRoute saveMyRoute(MyRouteDTO myRouteDTO){
        MyRoute myRoute = new MyRoute();
        myRoute.setUserId(myRouteDTO.getUserId());
        myRoute.setUserInfoId(myRouteDTO.getUserInfoId());
        return myRouteRepository.save(myRoute);
    }

}
