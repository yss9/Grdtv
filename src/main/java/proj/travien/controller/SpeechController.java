package proj.travien.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import proj.travien.service.SpeechToTextService;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

@RestController
@RequestMapping("/api")
public class SpeechController {

    @Autowired
    private SpeechToTextService speechToTextService;

    @PostMapping("/convert")
    public ResponseEntity<byte[]> convertSpeechToText(@RequestParam("file") MultipartFile file, @RequestParam("languageCode") String languageCode) throws IOException {
        if (file.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        byte[] audioBytes = file.getBytes();
        String transcript = speechToTextService.convertSpeechToText(audioBytes, languageCode);

        Path transcriptFile = Files.createTempFile("transcript-", ".txt");
        Files.write(transcriptFile, transcript.getBytes());

        byte[] transcriptBytes = Files.readAllBytes(transcriptFile);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.TEXT_PLAIN);
        headers.setContentDispositionFormData("attachment", "transcript.txt");
        headers.setContentLength(transcriptBytes.length);

        return new ResponseEntity<>(transcriptBytes, headers, HttpStatus.OK);
    }
}
