package proj.travien.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.Map;
import java.util.HashMap;

@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String secretKey;

    @Value("${jwt.expiration}")
    private long expiration;

    // 기본 토큰 생성 메소드
    public String generateToken(Long id, String userId, String nickname) {
        return generateToken(id, userId, nickname, new HashMap<>());
    }

    // 추가 claims가 있는 경우의 토큰 생성 메소드
    public String generateToken(Long id, String userId, String nickname, Map<String, Object> additionalClaims) {
        long now = System.currentTimeMillis();

        Map<String, Object> claims = new HashMap<>(additionalClaims);
        claims.put("id", id);
        claims.put("userId", userId);  // Add userId to claims
        claims.put("nickname", nickname);

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(new Date(now))
                .setExpiration(new Date(now + expiration)) // 만료 시간 설정
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }

    public Claims extractClaims(String token) {
        try {
            return Jwts.parser()
                    .setSigningKey(secretKey)
                    .parseClaimsJws(token)
                    .getBody();
        } catch (Exception e) {
            throw new IllegalArgumentException("Invalid JWT token");
        }
    }

    public String extractNickname(String token) {
        return extractClaims(token).get("nickname", String.class);
    }

    public Long extractId(String token) {
        return extractClaims(token).get("id", Long.class);
    }

    public String extractUserId(String token) {
        return extractClaims(token).get("userId", String.class);
    }

    public boolean isTokenExpired(String token) {
        return extractClaims(token).getExpiration().before(new Date());
    }

    // 토큰 유효성 검사 메서드 추가
    public boolean validateToken(String token) {
        try {
            Claims claims = extractClaims(token);
            return !isTokenExpired(token);
        } catch (Exception e) {
            return false; // 잘못된 토큰이거나 만료된 토큰일 경우 false 반환
        }
    }
}
