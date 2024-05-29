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

    public String convertSpeechToText(byte[] audioBytes) throws IOException {
        // 환경 변수 확인 로그 추가
        String credentialsPath = System.getenv("GOOGLE_APPLICATION_CREDENTIALS");
        logger.info("GOOGLE_APPLICATION_CREDENTIALS: " + credentialsPath);

        if (credentialsPath == null || credentialsPath.isEmpty()) {
            throw new IOException("GOOGLE_APPLICATION_CREDENTIALS 환경 변수가 설정되지 않았습니다.");
        }

        // 스테레오를 모노로 변환
        byte[] monoAudioBytes = convertToMono(audioBytes);

        try (SpeechClient speechClient = SpeechClient.create()) {
            ByteString audioData = ByteString.copyFrom(monoAudioBytes);

            RecognitionAudio audio = RecognitionAudio.newBuilder()
                    .setContent(audioData)
                    .build();

            // 파일의 샘플레이트를 44100 Hz로 설정
            RecognitionConfig config = RecognitionConfig.newBuilder()
                    .setEncoding(RecognitionConfig.AudioEncoding.LINEAR16)
                    .setSampleRateHertz(44100)
                    .setLanguageCode("ko-KR") // 언어 설정 나라마다 바꾸도록
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
