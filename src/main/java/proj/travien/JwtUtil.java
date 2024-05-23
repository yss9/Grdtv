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

    public String generateToken(String email, String name) {
        long now = System.currentTimeMillis();

        Map<String, Object> claims = new HashMap<>();
        claims.put("email", email);
        claims.put("name", name);

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(email)
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

    public String extractEmail(String token) {
        return extractClaims(token).get("email", String.class);
    }

    public String extractName(String token) {
        return extractClaims(token).get("name", String.class);
    }

    public boolean isTokenExpired(String token) {
        return extractClaims(token).getExpiration().before(new Date());
    }
}
