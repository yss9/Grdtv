package proj.travien.service;

import com.google.cloud.speech.v1.*;
import com.google.protobuf.ByteString;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.sound.sampled.*;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;

@Service
public class SpeechToTextService {

    private static final Logger logger = LoggerFactory.getLogger(SpeechToTextService.class);

    public String convertSpeechToText(byte[] audioBytes, String languageCode) throws IOException {
        // 환경 변수 확인 로그 추가
        String credentialsPath = System.getenv("GOOGLE_APPLICATION_CREDENTIALS");
        logger.info("GOOGLE_APPLICATION_CREDENTIALS: " + credentialsPath);

        if (credentialsPath == null || credentialsPath.isEmpty()) {
            throw new IOException("GOOGLE_APPLICATION_CREDENTIALS 환경 변수가 설정되지 않았습니다.");
        }

        // 오디오 파일의 샘플레이트 감지
        int sampleRate = getSampleRate(audioBytes);

        // 스테레오를 모노로 변환
        byte[] monoAudioBytes = convertToMono(audioBytes);

        try (SpeechClient speechClient = SpeechClient.create()) {
            ByteString audioData = ByteString.copyFrom(monoAudioBytes);

            RecognitionAudio audio = RecognitionAudio.newBuilder()
                    .setContent(audioData)
                    .build();

            // 감지된 샘플레이트 동적 설정
            RecognitionConfig config = RecognitionConfig.newBuilder()
                    .setEncoding(RecognitionConfig.AudioEncoding.LINEAR16)
                    .setSampleRateHertz(sampleRate)
                    .setLanguageCode(languageCode) // 언어 동적 설정
                    .build();

            RecognizeRequest request = RecognizeRequest.newBuilder()
                    .setConfig(config)
                    .setAudio(audio)
                    .build();

            RecognizeResponse response = speechClient.recognize(request);

            StringBuilder transcript = new StringBuilder();
            for (SpeechRecognitionResult result : response.getResultsList()) {
                SpeechRecognitionAlternative alternative = result.getAlternativesList().get(0);
                transcript.append(alternative.getTranscript());
            }

            return transcript.toString();
        }
    }

    private int getSampleRate(byte[] audioBytes) throws IOException {
        try (ByteArrayInputStream bais = new ByteArrayInputStream(audioBytes);
             AudioInputStream audioStream = AudioSystem.getAudioInputStream(bais)) {

            AudioFormat format = audioStream.getFormat();
            return (int) format.getSampleRate();
        } catch (UnsupportedAudioFileException e) {
            throw new IOException("오디오 파일 형식이 지원되지 않습니다.", e);
        }
    }

    private byte[] convertToMono(byte[] stereoAudioBytes) throws IOException {
        try (ByteArrayInputStream bais = new ByteArrayInputStream(stereoAudioBytes);
             AudioInputStream stereoStream = AudioSystem.getAudioInputStream(bais)) {

            AudioFormat stereoFormat = stereoStream.getFormat();
            AudioFormat monoFormat = new AudioFormat(
                    stereoFormat.getEncoding(),
                    stereoFormat.getSampleRate(),
                    stereoFormat.getSampleSizeInBits(),
                    1, // Mono
                    stereoFormat.getFrameSize() / 2,
                    stereoFormat.getFrameRate(),
                    stereoFormat.isBigEndian()
            );

            try (AudioInputStream monoStream = AudioSystem.getAudioInputStream(monoFormat, stereoStream);
                 ByteArrayOutputStream baos = new ByteArrayOutputStream()) {

                AudioSystem.write(monoStream, AudioFileFormat.Type.WAVE, baos);
                return baos.toByteArray();
            }
        } catch (UnsupportedAudioFileException e) {
            throw new IOException("오디오 파일 형식이 지원되지 않습니다.", e);
        }
    }
}
//curl -X POST -F "file=@C:\Users\허찬호\Downloads\KakaoTalk_Audio_20240604_1353_06_285.wav" -F "languageCode=ko-KR" http://localhost:8080/api/convert --output transcript.txt --verbose
//Test 명령어 터미널에 입력(음성파일 경로 넣기): (curl -X POST -F "file=@C:\Users\허찬호\Downloads\샘플_1.wav" -F "languageCode=ko-KR" http://localhost:8080/api/convert --output transcript.txt --verbose)
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

