package proj.travien.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/image/**")
                .addResourceLocations("file:src/main/resources/static/image/");
        registry.addResourceHandler("/profile-pictures/**")
                .addResourceLocations("file:src/main/resources/static/profile-pictures/");
        registry.addResourceHandler("/verification-files/**")
                .addResourceLocations("file:src/main/resources/static/verification-files/");
    }
}