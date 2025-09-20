package com.trophy.Trophy.DamagedTrophy;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController // Marks this class as a REST API controller
@RequestMapping("/api/damage-trophies") // Base URL for all endpoints in this controller
@CrossOrigin(origins = "*") // Allow CORS from any origin (React frontend)
public class DamagedTrophyController {

    private final DamagedTrophyService damagedTrophyService;

    public DamagedTrophyController(DamagedTrophyService damagedTrophyService) {
        this.damagedTrophyService = damagedTrophyService;
    }

    /**
     * Create a new Damaged Trophy with multiple SizeVariants and optional images.
     *
     * @param trophyCode       unique code for the trophy
     * @param sizeVariantsJson JSON string of size variants
     * @param imageFiles       optional list of images for each size variant
     */
    @PostMapping(value = "/create", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<DamagedTrophy> createTrophy(
            @RequestParam String trophyCode,
            @RequestPart("sizeVariants") String sizeVariantsJson,
            @RequestPart(value = "imageFiles", required = false) List<MultipartFile> imageFiles
    ) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        List<SizeVariantDamage> sizeVariants =
                mapper.readValue(sizeVariantsJson, new TypeReference<List<SizeVariantDamage>>() {
                });
        DamagedTrophy savedTrophy =
                damagedTrophyService.addMultipleSizes(trophyCode, sizeVariants, imageFiles);

        return ResponseEntity.ok(savedTrophy);
    }

    /**
     * Fetch all Damaged Trophies
     */
    @GetMapping
    public List<DamagedTrophy> getAllTrophies() {
        return damagedTrophyService.getAllTrophies();
    }

    /**
     * Get a Damaged Trophy by its code
     */
    @GetMapping("/{trophyCode}")
    public ResponseEntity<Optional<DamagedTrophy>> getTrophyByCode(@PathVariable String trophyCode) {
        return ResponseEntity.ok(damagedTrophyService.getTrophyByCode(trophyCode));
    }

    /**
     * Get a specific size variant of a Damaged Trophy
     */
    @GetMapping("/find/{trophyCode}/size/{size}")
    public ResponseEntity<SizeVariantDamage> getTrophyByCodeAndSize(
            @PathVariable String trophyCode,
            @PathVariable String size) {
        return ResponseEntity.ok(damagedTrophyService.getSizeByTrophyCodeAndSize(trophyCode, size));
    }

    /**
     * Update a specific size variant of a Damaged Trophy
     */
    @PutMapping(value = "/{trophyCode}/size/{size}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<DamagedTrophy> updateSizeVariant(
            @PathVariable String trophyCode,
            @PathVariable String size,
            @RequestParam double price,
            @RequestParam int quantity,
            @RequestParam String colour,
            @RequestParam String location,
            @RequestParam String doe,
            @RequestParam(required = false) String soldDate,
            @RequestParam(required = false) Double soldPrice,
            @RequestPart(required = false) MultipartFile imageFile
    ) throws IOException {
        SizeVariantDamage updatedSize = new SizeVariantDamage();
        updatedSize.setSize(size);
        updatedSize.setPrice(price);
        updatedSize.setQuantity(quantity);
        updatedSize.setColour(colour);
        updatedSize.setLocation(location);
        updatedSize.setDoe(doe);
        updatedSize.setSoldDate(soldDate);
        updatedSize.setSoldPrice(soldPrice);

        if (imageFile != null && !imageFile.isEmpty()) {
            updatedSize.setImage(imageFile.getBytes());
        }

        DamagedTrophy updatedTrophy =
                damagedTrophyService.updateSizeVariant(trophyCode, size, updatedSize, imageFile);
        return ResponseEntity.ok(updatedTrophy);
    }

    /**
     * Delete an entire Damaged Trophy by code
     */
    @DeleteMapping("/{trophyCode}")
    public ResponseEntity<Void> deleteTrophy(@PathVariable String trophyCode) {
        damagedTrophyService.deleteTrophy(trophyCode);
        return ResponseEntity.noContent().build();
    }

    /**
     * Delete a size variant from a Damaged Trophy
     */
    @DeleteMapping("/{trophyCode}/size/{size}")
    public ResponseEntity<DamagedTrophy> deleteSizeVariant(@PathVariable String trophyCode,
                                                           @PathVariable String size) {
        DamagedTrophy updatedTrophy = damagedTrophyService.deleteSizeVariant(trophyCode, size);
        return ResponseEntity.ok(updatedTrophy);
    }

    /**
     * Fetch the stored image of a specific size variant of a Damaged Trophy
     */
    @GetMapping("/{trophyCode}/size/{size}/image")
    public ResponseEntity<byte[]> getTrophyImage(
            @PathVariable String trophyCode,
            @PathVariable String size
    ) {
        byte[] image = damagedTrophyService.getImageByTrophyCodeAndSize(trophyCode, size);
        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG)
                .body(image);
    }
}