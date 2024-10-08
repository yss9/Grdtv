package proj.travien.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import proj.travien.domain.Role;

import java.util.Date;
import java.util.Map;
import java.util.HashMap;

@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String secretKey;

    @Value("${jwt.expiration}")
    private long expiration;

    // 기본 토큰 생성 메소드 (role 추가)
    public String generateToken(Long id, String userId, String nickname, Role role) {
        return generateToken(id, userId, nickname, role, new HashMap<>());
    }

    // 추가 claims가 있는 경우의 토큰 생성 메소드 (role 추가)
    public String generateToken(Long id, String userId, String nickname, Role role, Map<String, Object> additionalClaims) {
        long now = System.currentTimeMillis();

        Map<String, Object> claims = new HashMap<>(additionalClaims);
        claims.put("id", id);
        claims.put("userId", userId);
        claims.put("nickname", nickname);
        claims.put("role", role);  // role 추가

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(new Date(now))
                .setExpiration(new Date(now + expiration)) // 만료 시간 설정
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }

    // 클레임 추출 메서드
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

    // 역할(role) 추출 메서드
    public String extractRole(String token) {
        return extractClaims(token).get("role", String.class);
    }

    // nickname 추출 메서드
    public String extractNickname(String token) {
        return extractClaims(token).get("nickname", String.class);
    }

    // id 추출 메서드
    public Long extractId(String token) {
        return extractClaims(token).get("id", Long.class);
    }

    // userId 추출 메서드
    public String extractUserId(String token) {
        return extractClaims(token).get("userId", String.class);
    }

    // 토큰 만료 여부 확인 메서드
    public boolean isTokenExpired(String token) {
        return extractClaims(token).getExpiration().before(new Date());
    }

    // 토큰 유효성 검사 메서드
    public boolean validateToken(String token) {
        try {
            Claims claims = extractClaims(token);
            return !isTokenExpired(token);
        } catch (Exception e) {
            return false; // 잘못된 토큰이거나 만료된 토큰일 경우 false 반환
        }
    }
}
