package com.trophy.Trophy;

import java.util.List;

// import com.trophy.Trophy.DamagedTrophy.TrophyUpdateDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/rajetrophy")
@CrossOrigin(origins = "http://localhost:3001") // for React frontend
public class StoreAccController {

    public StoreAccController() {
        System.out.println("✅ StoreAccController Initialized");
    }

    @Autowired
    private StoreAccService service;

    // ✅ 1. Get all trophies
    @GetMapping
    public List<Trophy> getAllTrophies() {
        return service.getAllTrophies();
    }

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

    // ✅ Get all trophies by trophyCode
    @GetMapping("/code/{trophyCode}")
    public ResponseEntity<List<Trophy>> getTrophiesByTrophyCode(@PathVariable String trophyCode) {
        List<Trophy> trophies = service.getTrophiesByTrophyCode(trophyCode);
        return ResponseEntity.ok(trophies);
    }

    // ✅ Update all trophies by trophyCode
    @PutMapping("/update/{trophyCode}/size/{size}")
    public ResponseEntity<Trophy> updateByTrophyCodeAndSize(
            @PathVariable String trophyCode,
            @PathVariable Double size,
            @RequestBody TrophyUpdateDTO dto) {

        // Assuming only 1 size record is passed for this case
        TrophyUpdateDTO.SizeDetail sizeDetail = dto.getSizes().get(0);
        Trophy updated = service.updateByTrophyCodeAndSize(trophyCode, size, sizeDetail, dto);
        return ResponseEntity.ok(updated);
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
