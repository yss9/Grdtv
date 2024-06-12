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
    private static final String CREDENTIALS_ENV_VAR = "GOOGLE_APPLICATION_CREDENTIALS";

    public String convertSpeechToText(byte[] audioBytes, String languageCode) throws IOException {
        String credentialsPath = System.getenv(CREDENTIALS_ENV_VAR);
        logger.info(CREDENTIALS_ENV_VAR + ": " + credentialsPath);

        if (credentialsPath == null || credentialsPath.isEmpty()) {
            throw new IOException(CREDENTIALS_ENV_VAR + " 환경 변수가 설정되지 않았습니다.");
        }

        int sampleRate = getSampleRate(audioBytes);
        byte[] monoAudioBytes = convertToMono(audioBytes, sampleRate);

        try (SpeechClient speechClient = SpeechClient.create()) {
            ByteString audioData = ByteString.copyFrom(monoAudioBytes);

            RecognitionAudio audio = RecognitionAudio.newBuilder()
                    .setContent(audioData)
                    .build();

            RecognitionConfig config = RecognitionConfig.newBuilder()
                    .setEncoding(RecognitionConfig.AudioEncoding.LINEAR16)
                    .setSampleRateHertz(sampleRate)
                    .setLanguageCode(languageCode)
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
            throw new IOException("지원되지 않는 오디오 파일 형식입니다.", e);
        }
    }

    private byte[] convertToMono(byte[] stereoAudioBytes, int sampleRate) throws IOException {
        try (ByteArrayInputStream bais = new ByteArrayInputStream(stereoAudioBytes);
             AudioInputStream stereoStream = AudioSystem.getAudioInputStream(bais)) {

            AudioFormat stereoFormat = stereoStream.getFormat();
            AudioFormat monoFormat = new AudioFormat(
                    AudioFormat.Encoding.PCM_SIGNED,
                    sampleRate,
                    16,
                    1, // 모노
                    2,
                    sampleRate,
                    false
            );

            try (AudioInputStream monoStream = AudioSystem.getAudioInputStream(monoFormat, stereoStream);
                 ByteArrayOutputStream baos = new ByteArrayOutputStream()) {

                byte[] buffer = new byte[1024];
                int bytesRead;
                while ((bytesRead = monoStream.read(buffer)) != -1) {
                    baos.write(buffer, 0, bytesRead);
                }
                return baos.toByteArray();
            }
        } catch (UnsupportedAudioFileException e) {
            throw new IOException("지원되지 않는 오디오 파일 형식입니다.", e);
        }
    }
}
