// java
package com.trophy.Trophy.Image;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/images")
public class ImageController {

    private final ImageService service;

    public ImageController(ImageService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<Iterable<ImageDTO>> getAll() {
        Iterable<ImageDTO> images = service.getAll();
        return ResponseEntity.ok(images);
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Iterable<ImageDTO>> upload(@RequestPart(value = "file", required = false) MultipartFile[] files) {
        if (files == null || files.length == 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Missing or empty 'file' part. Use multipart/form-data with one or more form fields named `file` (use the `multiple` attribute on the input).");
        }
        List<ImageDTO> dtos = service.saveAll(files);
        return ResponseEntity.status(HttpStatus.CREATED).body(dtos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<byte[]> download(@PathVariable String id) {
        Image image = service.getEntity(id);
        var headers = new org.springframework.http.HttpHeaders();
        headers.setContentType(org.springframework.http.MediaType.parseMediaType(image.getContentType() == null ? "application/octet-stream" : image.getContentType()));
        headers.setContentLength(image.getSize() == null ? image.getData().length : image.getSize());
        headers.setContentDispositionFormData("inline", image.getFileName() == null ? "file" : image.getFileName());
        return new ResponseEntity<>(image.getData(), headers, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
