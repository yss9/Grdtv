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
        if (file.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        byte[] audioBytes = file.getBytes();
        String transcript = speechToTextService.convertSpeechToText(audioBytes, languageCode);

        return new ResponseEntity<>(transcript, HttpStatus.OK);
    }
}
