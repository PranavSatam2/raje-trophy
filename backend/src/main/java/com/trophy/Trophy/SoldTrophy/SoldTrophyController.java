package com.trophy.Trophy.SoldTrophy;

import com.trophy.Trophy.Trophy;
import com.trophy.Trophy.TrophyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/sold-trophies")
@CrossOrigin(origins = "*")
public class SoldTrophyController {

    @Autowired
    private SoldTrophyRepository soldTrophyRepo;

    @Autowired
    private TrophyRepository trophyRepo;

    @PostMapping("/{trophyCode}/sell")
    public ResponseEntity<?> sellTrophy(
            @PathVariable String trophyCode,
            @RequestParam String size,
            @RequestParam int quantity,
            @RequestParam double soldPrice,
            @RequestParam String soldDate) {

        // Optional: check if trophy exists and size exists
        Trophy trophy = trophyRepo.findByTrophyCode(trophyCode)
                .orElseThrow(() -> new RuntimeException("Trophy not found"));
        trophy.getSizes().stream()
                .filter(s -> s.getSize().equals(size))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Size not found"));

        // Save sold record
        SoldTrophy sold = new SoldTrophy();
        sold.setTrophyCode(trophyCode);
        sold.setSize(size);
        sold.setSoldQuantity(quantity);
        sold.setSoldPrice(soldPrice);
        sold.setSoldDate(String.valueOf(LocalDate.parse(soldDate)));
        soldTrophyRepo.save(sold);

        return ResponseEntity.ok("Sold record saved");
    }

    @GetMapping
    public List<SoldTrophy> getAllSoldTrophies() {
        return soldTrophyRepo.findAll();
    }

//    @GetMapping("/sold-trophies")
//    public List<SoldTrophy> getAllSoldTrophies() {
//        return soldTrophyRepository.findAll();
//    }

}
