package proj.travien;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.Map;
import java.util.HashMap;

@Component
public class JwtUtil {

    private String secretKey = "chan_ho_woo_dang"; // 실제 환경에서는 환경 변수나 외부 설정 파일에서 가져오는 것이 좋습니다.

    public String generateToken(Long id, String userId, String nickname) {
        long now = System.currentTimeMillis();

        Map<String, Object> claims = new HashMap<>();
        claims.put("id", id);
        claims.put("userId", userId);  // Add userId to claims
        claims.put("nickname", nickname);

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(new Date(now))
                .setExpiration(new Date(now + 1000 * 60 * 60 * 10)) // 10시간 후 만료
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }

    public Claims extractClaims(String token) {
        return Jwts.parser()
                .setSigningKey(secretKey)
                .parseClaimsJws(token)
                .getBody();
    }

    public String extractNickname(String token) {
        return extractClaims(token).get("nickname", String.class);
    }

    public Long extractId(String token) {
        return extractClaims(token).get("id", Long.class);
    }

    public String extractUserId(String token) {
        return extractClaims(token).get("userId", String.class); // Add method to extract userId
    }

    public boolean isTokenExpired(String token) {
        return extractClaims(token).getExpiration().before(new Date());
    }
}
