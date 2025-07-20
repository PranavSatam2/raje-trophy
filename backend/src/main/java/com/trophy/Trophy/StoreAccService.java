package com.trophy.Trophy;

import java.sql.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

// import com.trophy.Trophy.DamagedTrophy.TrophyUpdateDTO;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StoreAccService {

    private static final Logger logger = LoggerFactory.getLogger(StoreAccService.class);

    @Autowired
    private StoreAccRepository repository;

    // ✅ Add multiple trophies for one trophyCode
    public String saveMultipleTrophies(TrophyDTO dto) {
        List<TrophyDTO.SizeDetail> sizes = dto.getSizes(); // ✅ should work

        for (TrophyDTO.SizeDetail sizeDetail : sizes) {
            Trophy trophy = new Trophy();

            trophy.setTrophyCode(dto.getTrophyCode());
            trophy.setSize(sizeDetail.getSize());
            trophy.setPrice(sizeDetail.getPrice());
            trophy.setQuantity(sizeDetail.getQuantity());
            trophy.setColour(sizeDetail.getColour());
            trophy.setLocation(sizeDetail.getLocation());
            trophy.setDoe(Date.valueOf(sizeDetail.getDoe())); // only if doe is string in "yyyy-MM-dd"
            trophy.setImage(sizeDetail.getImage());
            trophy.setSoldDate(Date.valueOf(sizeDetail.getSoldDate()));
            trophy.setSoldPrice(sizeDetail.getSoldPrice());
            trophy.setSoldDate(Date.valueOf(sizeDetail.getSoldDate()));
            trophy.setSoldPrice(sizeDetail.getSoldPrice());

            repository.save(trophy);
        }

        return "Trophies added successfully!";
    }



    // ✅ Get all
    public List<Trophy> getAllTrophies() {
        logger.info("Fetching all trophies");
        return repository.findAll();
    }

    // Find specific trophy by code and size
    public Trophy findByTrophyCodeAndSize(String trophyCode, Double size) {
        return repository.findByTrophyCodeAndSize(trophyCode, size)
                .orElseThrow(() -> new RuntimeException("Trophy not found with code: " + trophyCode + " and size: " + size));
    }

    // Update trophy by code and size
    @Transactional
    public void updateByTrophyCodeAndSize(String trophyCode, Double size, Trophy updatedData) {
        Trophy existingTrophy = repository.findByTrophyCodeAndSize(trophyCode, size)
                .orElseThrow(() -> new RuntimeException("Trophy not found with code: " + trophyCode + " and size: " + size));

        // Update fields (keeping trophyCode and size unchanged)
        existingTrophy.setPrice(updatedData.getPrice());
        existingTrophy.setQuantity(updatedData.getQuantity());
        existingTrophy.setColour(updatedData.getColour());
        existingTrophy.setLocation(updatedData.getLocation());
        existingTrophy.setDoe(updatedData.getDoe());
        existingTrophy.setImage(updatedData.getImage());
        existingTrophy.setSoldDate(updatedData.getSoldDate());
        existingTrophy.setSoldPrice(updatedData.getSoldPrice());

        repository.save(existingTrophy);
    }




    // ✅ Delete trophies by trophyCode
    @Transactional
    public void deleteByTrophyCodeAndSize(String trophyCode, Double size) {
        Trophy trophy = repository.findByTrophyCodeAndSize(trophyCode, size)
                .orElseThrow(() -> new RuntimeException("Trophy not found with code: " + trophyCode + " and size: " + size));

        repository.delete(trophy);
    }

}
