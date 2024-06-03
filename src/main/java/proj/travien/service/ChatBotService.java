//package proj.travien.service;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.stereotype.Service;
//import org.springframework.web.reactive.function.client.WebClient;
//import proj.travien.dto.OpenAIRequest;
//import proj.travien.dto.OpenAIResponse;
//import reactor.core.publisher.Mono;
//
//import java.util.List;
//
//@Service
//public class ChatBotService {
//    private final WebClient webClient;
//
//    @Value("${gpt_api.key}")
//    private String apiKey;
//
//    public ChatBotService(WebClient.Builder webClientBuilder) {
//        this.webClient = webClientBuilder.baseUrl("https://api.openai.com/v1").build();
//    }
//
//    public Mono<String> getChatResponse(String prompt) {
//        OpenAIRequest request = new OpenAIRequest("gpt-3.5-turbo", List.of(new OpenAIRequest.Message("user", prompt)));
//
//        return webClient.post()
//                .uri("/chat/completions")
//                .header("Authorization", "Bearer " + apiKey)
//                .bodyValue(request)
//                .retrieve()
//                .bodyToMono(OpenAIResponse.class)
//                .map(response -> response.getChoices().get(0).getMessage().getContent());
//    }
//
//}
