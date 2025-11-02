package com.trophy.Trophy;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.trophy.Trophy.SoldTrophy.SoldTrophy;
import com.trophy.Trophy.SoldTrophy.SoldTrophyRepository;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/trophies")
@CrossOrigin(origins = "*")
//@PreAuthorize("hasRole('ADMIN')")
public class TrophyController {

    private final TrophyService trophyService;

    private final SoldTrophyRepository soldTrophyRepository;

    public TrophyController(TrophyService trophyService, SoldTrophyRepository soldTrophyRepository) {
        this.trophyService = trophyService;
        this.soldTrophyRepository = soldTrophyRepository;
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

    // Controller
    @GetMapping("/find/{trophyCode}/size/{size}")
    public ResponseEntity<SizeVariant> getTrophyByCodeAndSize(
            @PathVariable String trophyCode,
            @PathVariable String size) {
        return ResponseEntity.ok(trophyService.getSizeByTrophyCodeAndSize(trophyCode, size));
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
            @RequestParam String doe,
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

        // ✅ Add doe mapping
        updatedSize.setDoe(doe);

        updatedSize.setSoldDate(soldDate);
        updatedSize.setSoldPrice(soldPrice);

        if (imageFile != null && !imageFile.isEmpty()) {
            updatedSize.setImage(imageFile.getBytes());
        }

        Trophy updatedTrophy = trophyService.updateAndSellTrophy(trophyCode, size, updatedSize, imageFile);
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
    public ResponseEntity<?> deleteSizeVariant(@PathVariable String trophyCode, @PathVariable String size) {
        Trophy updated = trophyService.deleteSizeVariant(trophyCode, size);

        if (updated == null) {
            return ResponseEntity.ok("Trophy deleted because all sizes were removed");
        }

        return ResponseEntity.ok(updated);
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

    @PutMapping(value = "/sell/{trophyCode}/size/{size}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Trophy> sellTrophy(
            @PathVariable String trophyCode,
            @PathVariable String size,
            @RequestParam double price,
            @RequestParam int quantity,
            @RequestParam String colour,
            @RequestParam String location,
            @RequestParam String doe,
            @RequestParam String soldDate,
            @RequestParam Double soldPrice,
            @RequestParam Integer soldQuantity,
            @RequestParam Double soldCurrentQuantityPrice,
            @RequestPart(required = false) MultipartFile imageFile
    ) throws IOException {
        SizeVariant updatedSize = new SizeVariant();
        updatedSize.setSize(size);
        updatedSize.setPrice(price);
        updatedSize.setQuantity(quantity);
        updatedSize.setColour(colour);
        updatedSize.setLocation(location);
        updatedSize.setDoe(doe);
        updatedSize.setSoldDate(soldDate);
        updatedSize.setSoldPrice(soldPrice);
        updatedSize.setSoldQuantity(soldQuantity);
        updatedSize.setSoldCurrentQuantityPrice(soldCurrentQuantityPrice);

        if (imageFile != null && !imageFile.isEmpty()) {
            updatedSize.setImage(imageFile.getBytes());
        }

        Trophy updatedTrophy = trophyService.updateAndSellTrophy(trophyCode, size, updatedSize, imageFile);
        return ResponseEntity.ok(updatedTrophy);
    }

//    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/export-sold-trophies")
    public ResponseEntity<byte[]> exportSoldTrophies(
            @RequestParam(required = false) String trophyCode,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) String fromDate,
            @RequestParam(required = false) String toDate
    ) throws Exception {

        List<SoldTrophy> soldTrophies = soldTrophyRepository.findAll();// Fetch all

        // Apply filters if provided
        if (trophyCode != null) {
            soldTrophies = soldTrophies.stream()
                    .filter(t -> t.getTrophyCode().equalsIgnoreCase(trophyCode))
                    .collect(Collectors.toList());
        }

        if (location != null) {
            soldTrophies = soldTrophies.stream()
                    .filter(t -> t.getLocation().equalsIgnoreCase(location))
                    .collect(Collectors.toList());
        }

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        if (fromDate != null) {
            LocalDate from = LocalDate.parse(fromDate);
            soldTrophies = soldTrophies.stream()
                    .filter(t -> t.getSoldDate() != null && LocalDate.parse(t.getSoldDate()).isAfter(from.minusDays(1)))
                    .collect(Collectors.toList());
        }

        if (toDate != null) {
            LocalDate to = LocalDate.parse(toDate);
            soldTrophies = soldTrophies.stream()
                    .filter(t -> t.getSoldDate() != null && LocalDate.parse(t.getSoldDate()).isBefore(to.plusDays(1)))
                    .collect(Collectors.toList());
        }

        // Create Excel workbook
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Sold Trophies");
        Row header = sheet.createRow(0);
        String[] columns = {"Trophy Code", "Size", "Quantity Sold", "Sold Price", "Total Amount", "Sold Date", "Location"};
        for (int i = 0; i < columns.length; i++) {
            header.createCell(i).setCellValue(columns[i]);
        }

        int rowNum = 1;
        for (SoldTrophy t : soldTrophies) {
            Row row = sheet.createRow(rowNum++);
            row.createCell(0).setCellValue(t.getTrophyCode());
            row.createCell(1).setCellValue(t.getSize());
            row.createCell(2).setCellValue(t.getSoldQuantity());
            row.createCell(3).setCellValue(t.getSoldPrice());
            row.createCell(4).setCellValue(t.getSoldCurrentQuantityPrice());
            row.createCell(5).setCellValue(t.getSoldDate() != null ? t.getSoldDate().toString() : "");
            row.createCell(6).setCellValue(t.getLocation());
        }

        // Auto-size columns
        for (int i = 0; i < columns.length; i++) {
            sheet.autoSizeColumn(i);
        }

        ByteArrayOutputStream out = new ByteArrayOutputStream();
        workbook.write(out);
        workbook.close();

        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=sold_trophies.xlsx");

        return ResponseEntity.ok()
                .headers(headers)
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(out.toByteArray());
    }

}
