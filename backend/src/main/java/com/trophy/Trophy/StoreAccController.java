package com.trophy.Trophy;

import java.util.List;

// import com.trophy.Trophy.DamagedTrophy.TrophyUpdateDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/rajetrophy")
@CrossOrigin(origins = "http://localhost:3000") // for React frontend
public class StoreAccController {

    public StoreAccController() {
        System.out.println("✅ StoreAccController Initialized");
    }

    @Autowired
    private StoreAccService service;


    // ✅ 3. Save multiple trophies from DTO (Main Requirement)
    @PostMapping("/add")
    public ResponseEntity<String> saveMultipleTrophies(@Valid @RequestBody TrophyDTO dto) {
        String result = service.saveMultipleTrophies(dto);
        return ResponseEntity.ok(result);
    }

//    // ✅ 4. Save a single trophy (fallback if used individually)
//    @PostMapping
//    public Trophy saveSingleTrophy(@RequestBody Trophy trophy) {
//        return service.saveStoreAcceptance(trophy);
//    }

    // Get specific trophy by code and size
    @GetMapping("/find/{trophyCode}/size/{size}")
    public ResponseEntity<Trophy> findByTrophyCodeAndSize(
            @PathVariable String trophyCode,
            @PathVariable Double size) {

        try {
            Trophy trophy = service.findByTrophyCodeAndSize(trophyCode, size);
            return ResponseEntity.ok(trophy);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Update trophy by code and size
    @PutMapping("/update/{trophyCode}/size/{size}")
    public ResponseEntity<String> updateByTrophyCodeAndSize(
            @PathVariable String trophyCode,
            @PathVariable Double size,
            @RequestBody Trophy updatedTrophy) {

        try {
            service.updateByTrophyCodeAndSize(trophyCode, size, updatedTrophy);
            return ResponseEntity.ok("Successfully updated trophy with code: " + trophyCode + " and size: " + size);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error: " + e.getMessage());
        }
    }

    // Get all trophies
    @GetMapping("/all")
    public ResponseEntity<List<Trophy>> getAllTrophies() {
        List<Trophy> trophies = service.getAllTrophies();
        return ResponseEntity.ok(trophies);
    }


    // ✅ Delete all trophies by trophyCode
    @DeleteMapping("/delete/{trophyCode}/size/{size}")
    public ResponseEntity<String> deleteByTrophyCodeAndSize(
            @PathVariable String trophyCode,
            @PathVariable Double size) {

        service.deleteByTrophyCodeAndSize(trophyCode, size);
        return ResponseEntity.ok("Deleted trophy with code: " + trophyCode + " and size: " + size);
    }

}
