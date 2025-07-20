package com.trophy.Trophy.DamagedTrophy;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/damaged-trophies")
@CrossOrigin(origins = "http://localhost:3000")
public class DamagedTrophyController {

    public DamagedTrophyController() {
        System.out.println("✅ DamagedTrophyController Initialized");
    }

    @Autowired
    private DamagedTrophyService service;

    // ✅ 1. Get all damaged trophies
    @GetMapping
    public List<DamagedTrophy> getAllDamagedTrophies() {
        return service.getAllDamagedTrophies();
    }

    // ✅ 2. Get one damaged trophy by ID
    @GetMapping("/code/{trophyCode}")
    public ResponseEntity<List<DamagedTrophy>> getByTrophyCode(@PathVariable String trophyCode) {
        List<DamagedTrophy> list = service.getDamagedTrophiesByTrophyCode(trophyCode);
        return ResponseEntity.ok(list);
    }

    // ✅ 3. Save multiple damaged trophies using DTO with size + remark
    @PostMapping("/add")
    public ResponseEntity<String> saveMultipleDamagedTrophies(@Valid @RequestBody DamagedTrophyDTO dto) {
        String result = service.saveMultipleDamagedTrophies(dto);
        return ResponseEntity.ok(result);
    }

    // ✅ Update by trophyCode and size
    @PutMapping("/update/code/{trophyCode}/size/{size}")
    public ResponseEntity<String> updateByTrophyCodeAndSize(@PathVariable String trophyCode,
                                                            @PathVariable Double size,
                                                            @RequestBody DamagedTrophyDTO.SizeDetail sizeDetail) {
        String result = service.updateByTrophyCodeAndSize(trophyCode, size, sizeDetail);
        return ResponseEntity.ok(result);
    }

    // ✅ Delete by trophyCode and size
    @DeleteMapping("/delete/code/{trophyCode}/size/{size}")
    public ResponseEntity<String> deleteByTrophyCodeAndSize(@PathVariable String trophyCode,
                                                            @PathVariable Double size) {
        service.deleteByTrophyCodeAndSize(trophyCode, size);
        return ResponseEntity.ok("Deleted damaged trophy with trophyCode: " + trophyCode + " and size: " + size);
    }


}
