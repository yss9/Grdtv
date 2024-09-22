package proj.travien.jwt;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.authentication.Http403ForbiddenEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.stereotype.Component;

@Component
public class SecurityConfig {

    // JwtAuthenticationFilter를 필터 체인에 등록
    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())  // CSRF 비활성화
                .authorizeHttpRequests(auth -> auth
                        // public 경로는 모든 사용자에게 허용
                        .requestMatchers("/api/public/**").permitAll()
                        // private 경로는 로그인된 사용자만 접근 가능
                        .requestMatchers("/api/private/**").authenticated()
                        // 관리자 권한이 필요한 경로
                        .requestMatchers("/api/admin/**").hasRole("ADMIN")
                        // 그 외의 모든 요청은 인증 필요 없음
                        .anyRequest().permitAll()
                )
                // 로그아웃 설정
                .logout(logout -> logout.permitAll())
                // 접근 거부 시 403 Forbidden 반환
                .exceptionHandling(exceptionHandling -> exceptionHandling
                        .authenticationEntryPoint(new Http403ForbiddenEntryPoint())
                        .accessDeniedHandler(accessDeniedHandler())
                )
                // JWT 필터를 UsernamePasswordAuthenticationFilter 앞에 추가
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    public AccessDeniedHandler accessDeniedHandler() {
        return (request, response, accessDeniedException) -> {
            response.sendError(HttpServletResponse.SC_FORBIDDEN, "Access Denied");
        };
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();  // 비밀번호 암호화에 BCrypt 사용
    }
}
