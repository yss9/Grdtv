package proj.travien.jwt;

import io.jsonwebtoken.Claims;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Component;

import java.util.Collections;

@Component
public class JwtTokenProvider {

    private final JwtUtil jwtUtil;

    public JwtTokenProvider(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    // 토큰에서 인증 정보 추출
    public Authentication getAuthentication(String token) {
        Claims claims = jwtUtil.extractClaims(token);

        String username = claims.getSubject();  // JWT에서 사용자 ID 추출
        String role = claims.get("role", String.class);  // JWT에서 역할(Role) 추출

        // Spring Security에서 사용할 권한 생성
        SimpleGrantedAuthority authority = new SimpleGrantedAuthority("ROLE_" + role);

        // UsernamePasswordAuthenticationToken을 생성해 Authentication 객체로 반환
        return new UsernamePasswordAuthenticationToken(username, null, Collections.singleton(authority));
    }

    // 토큰의 유효성 검증
    public boolean validateToken(String token) {
        return !jwtUtil.isTokenExpired(token);  // 토큰이 만료되지 않았는지 확인
    }
}
