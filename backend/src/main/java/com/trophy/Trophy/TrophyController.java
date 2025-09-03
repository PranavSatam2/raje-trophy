package com.trophy.Trophy;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/trophies")
@CrossOrigin(origins = "*")
public class TrophyController {

    private final TrophyService trophyService;

    public TrophyController(TrophyService trophyService) {
        this.trophyService = trophyService;
    }

    // CREATE Trophy with multiple SizeVariants
    @PostMapping(value = "/create", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Trophy> createTrophy(
            @RequestParam String trophyCode,
            @RequestPart("sizeVariants") String sizeVariantsJson,   // JSON string
            @RequestPart(value = "imageFiles", required = false) List<MultipartFile> imageFiles
    ) throws IOException {

        // ✅ Convert JSON string to List<SizeVariant>
        ObjectMapper mapper = new ObjectMapper();
        List<SizeVariant> sizeVariants = mapper.readValue(sizeVariantsJson, new TypeReference<List<SizeVariant>>() {});

        // Pass the deserialized list to the service
        Trophy savedTrophy = trophyService.addMultipleSizes(trophyCode, sizeVariants, imageFiles);

        return ResponseEntity.ok(savedTrophy);
    }


    // READ all trophies
    @GetMapping
    public List<Trophy> getAllTrophies() {
        return trophyService.getAllTrophies();
    }

    // READ trophy by code
    @GetMapping("/{trophyCode}")
    public ResponseEntity<Optional<Trophy>> getTrophyByCode(@PathVariable String trophyCode) {
        return ResponseEntity.ok(trophyService.getTrophyByCode(trophyCode));
    }

    // UPDATE specific size of a trophy
    @PutMapping(value = "/{trophyCode}/size/{size}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Trophy> updateSizeVariant(
            @PathVariable String trophyCode,
            @PathVariable String size,
            @RequestParam double price,
            @RequestParam int quantity,
            @RequestParam String colour,
            @RequestParam String location,
            @RequestParam(required = false) String soldDate,
            @RequestParam(required = false) Double soldPrice,
            @RequestPart(required = false) MultipartFile imageFile
    ) throws IOException {
        SizeVariant updatedSize = new SizeVariant();
        updatedSize.setSize(size);
        updatedSize.setPrice(price);
        updatedSize.setQuantity(quantity);
        updatedSize.setColour(colour);
        updatedSize.setLocation(location);
        updatedSize.setSoldDate(soldDate);
        updatedSize.setSoldPrice(soldPrice);

        Trophy updatedTrophy = trophyService.updateSizeVariant(trophyCode, size, updatedSize, imageFile);
        return ResponseEntity.ok(updatedTrophy);
    }


    // DELETE trophy
    @DeleteMapping("/{trophyCode}")
    public ResponseEntity<Void> deleteTrophy(@PathVariable String trophyCode) {
        trophyService.deleteTrophy(trophyCode);
        return ResponseEntity.noContent().build();
    }

    // DELETE size variant
    @DeleteMapping("/{trophyCode}/size/{size}")
    public ResponseEntity<Trophy> deleteSizeVariant(@PathVariable String trophyCode, @PathVariable String size) {
        Trophy updatedTrophy = trophyService.deleteSizeVariant(trophyCode, size);
        return ResponseEntity.ok(updatedTrophy);
    }

    @GetMapping("/{trophyCode}/size/{size}/image")
    public ResponseEntity<byte[]> getTrophyImage(
            @PathVariable String trophyCode,
            @PathVariable String size
    ) {
        byte[] image = trophyService.getImageByTrophyCodeAndSize(trophyCode, size);
        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG)
                .body(image);
    }

}
