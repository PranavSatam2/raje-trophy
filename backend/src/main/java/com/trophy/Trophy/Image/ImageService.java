// java
package com.trophy.Trophy.Image;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ImageService {

    private final ImageRepository repo;

    public ImageService(ImageRepository repo) {
        this.repo = repo;
    }

    public ImageDTO save(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "File is empty");
        }
        try {
            Image image = new Image();
            image.setFileName(file.getOriginalFilename());
            image.setContentType(file.getContentType());
            image.setSize(file.getSize());
            image.setUploadedAt(LocalDateTime.now());
            image.setData(file.getBytes());
            Image saved = repo.save(image);
            return toDto(saved);
        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to read file", e);
        }
    }

    public List<ImageDTO> saveAll(MultipartFile[] files) {
        if (files == null || files.length == 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "No files provided");
        }
        return Arrays.stream(files)
                .filter(f -> f != null && !f.isEmpty())
                .map(this::save)
                .collect(Collectors.toList());
    }

    public Image getEntity(String id) {
        return repo.findById(id).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "Image not found: " + id));
    }

    public Iterable<ImageDTO> getAll() {
        return repo.findAll().stream().map(this::toDto).collect(Collectors.toList());
    }

    public void delete(String id) {
        if (!repo.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Image not found: " + id);
        }
        repo.deleteById(id);
    }

    private ImageDTO toDto(Image image) {
        return new ImageDTO(
                image.getId(),
                image.getFileName(),
                image.getContentType(),
                image.getSize(),
                image.getUploadedAt()
        );
    }
}
