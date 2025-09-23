package com.trophy.Trophy.SoldTrophy;

import com.trophy.Trophy.SizeVariant;
import com.trophy.Trophy.Trophy;
import com.trophy.Trophy.TrophyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class SoldTrophyService {

    @Autowired
    private TrophyRepository trophyRepo;

    @Autowired
    private SoldTrophyRepository soldRepo;

//    public SoldTrophy sellTrophy(String trophyCode, String size, int quantitySold, double soldPrice, String soldDate) {
//        // 1. Find Trophy
//        Trophy trophy = trophyRepo.findByTrophyCode(trophyCode)
//                .orElseThrow(() -> new RuntimeException("Trophy not found"));
//
//        // 2. Find the SizeVariant within the Trophy
//        SizeVariant variant = trophy.getSizes().stream()
//                .filter(s -> s.getSize().equals(size))
//                .findFirst()
//                .orElseThrow(() -> new RuntimeException("Size not found"));
//
//        // 3. Check stock
//        if (variant.getQuantity() < quantitySold) {
//            throw new RuntimeException("Not enough stock for size " + size);
//        }
//
//        // 4. Deduct stock
//        variant.setQuantity(variant.getQuantity() - quantitySold);
//
//        // 5. Optionally store sold info on the variant
//        variant.setSoldPrice(soldPrice);
//        variant.setSoldDate(soldDate);
//
//        // 6. Save a record of the sale in SoldTrophy collection
//        SoldTrophy sold = new SoldTrophy();
//        sold.setTrophyCode(trophyCode);
//        sold.setSize(size);
//        sold.setSoldQuantity(quantitySold);
//        sold.setSoldPrice(soldPrice);
//        sold.setSoldDate(String.valueOf(LocalDate.parse(soldDate)));
//        soldRepo.save(sold);
//
//        // 7. Save updated trophy back to MongoDB
//        trophyRepo.save(trophy);
//        return sold;
//    }



    public List<SoldTrophy> getAllSold() {
        return soldRepo.findAll();
    }
}
