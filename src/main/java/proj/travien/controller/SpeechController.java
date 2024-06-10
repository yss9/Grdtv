package proj.travien.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import proj.travien.service.SpeechToTextService;

import java.io.IOException;

@RestController
@RequestMapping("/api")
public class SpeechController {

    @Autowired
    private SpeechToTextService speechToTextService;

    @PostMapping("/convert")
    public ResponseEntity<String> convertSpeechToText(@RequestParam("file") MultipartFile file, @RequestParam("languageCode") String languageCode) throws IOException {
        // 파일이 비어있는지 확인
        if (file.isEmpty()) {
            return new ResponseEntity<>("파일이 비어 있습니다.", HttpStatus.BAD_REQUEST);
        }

        // 파일을 바이트 배열로 변환
        byte[] audioBytes = file.getBytes();
        // 음성 파일을 텍스트로 변환
        String transcript;
        try {
            transcript = speechToTextService.convertSpeechToText(audioBytes, languageCode);
        } catch (Exception e) {
            return new ResponseEntity<>("음성 변환 중 오류가 발생했습니다: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }

        // 변환된 텍스트와 함께 성공 응답 반환
        return new ResponseEntity<>(transcript, HttpStatus.OK);
    }
}

//Test 명령어 터미널에 입력(음성파일 경로 넣기):
/*
curl -X POST \
  http://localhost:8080/api/convert \
  -H "Content-Type: multipart/form-data" \
  -F "file=@\"C:\Users\허찬호\Downloads\통화 녹음 050714610295_240506_095042.wav\"" \
  -F "languageCode=ko-KR"
"C:\Users\허찬호\Downloads\통화 녹음 050714610295_240506_095042.wav"
 */
//C:\Users\허찬호\Downloads\KakaoTalk_Audio_20240604_1353_06_285.wav
//C:\Users\허찬호\Downloads\샘플_1.wav
//spring.servlet.multipart.max-file-size=50MB
//spring.servlet.multipart.max-request-size=50MB
//application.properties에 위 두줄 추가
//환경변수 설정: win+r -> sysdm.cpl -> 고급 들어가서 시스템 환경변수 새로만들기
//변수이름: GOOGLE_APPLICATION_CREDENTIALS , 변수값:C:\Users\허찬호\Downloads\travien-52b10c6761f0.json -> 구글api 키 파일 경로 입력(찬호한테 파일 있음)

//주요 언어 코드
//한국어 (Korean): ko-KR
//영어 (English):
//미국: en-US
//영국: en-GB
//호주: en-AU
//캐나다: en-CA
//인도: en-IN
//중국어 (Chinese):
//중국 표준어: zh-CN
//홍콩 광둥어: zh-HK
//대만 표준어: zh-TW
//일본어 (Japanese): ja-JP
//독일어 (German): de-DE
//프랑스어 (French):
//프랑스: fr-FR
//캐나다: fr-CA
//스페인어 (Spanish):
//스페인: es-ES
//미국: es-US
//멕시코: es-MX
//포르투갈어 (Portuguese):
//브라질: pt-BR
//포르투갈: pt-PT
//러시아어 (Russian): ru-RU
//이탈리아어 (Italian): it-IT
//네덜란드어 (Dutch): nl-NL
//힌디어 (Hindi): hi-IN
//아랍어 (Arabic): ar-SA (사우디아라비아)
//베트남어 (Vietnamese): vi-VN
//태국어 (Thai): th-TH
