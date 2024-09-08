package proj.travien.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
@Slf4j
public class FileUploadeService {

    @Value("${upload.location}")
    private String UPLOAD_LOCATION;

    public String saveFile(MultipartFile file) {
        String uuid = UUID.randomUUID().toString();
        String saveFileName = uuid + ".png";
        Path savePath = Paths.get(UPLOAD_LOCATION + saveFileName);



        try {
            file.transferTo(savePath);
        } catch (IOException e) {
            log.error("Error occurred while saving file: {}", e.getMessage(), e);
        }
        return saveFileName.toString();
    }
}
