package com.trophy.Trophy;

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
        logger.info("Saving multiple trophies for trophyCode: {}", dto.getTrophyCode());

        List<Trophy> trophies = dto.getSizes().stream().map(sizeDetail -> Trophy.builder()
                .trophyCode(dto.getTrophyCode())
                .location(dto.getLocation())
                .doe(dto.getDoe())
                .image(dto.getImage())
                .size(sizeDetail.getSize())
                .price(sizeDetail.getPrice())
                .quantity(sizeDetail.getQuantity())
                .colour(sizeDetail.getColour())
                .soldPrice(sizeDetail.getSoldPrice())
                .soldDate(sizeDetail.getSoldDate())
                .build()
        ).collect(Collectors.toList());

        repository.saveAll(trophies);
        logger.debug("Total {} trophies saved for trophyCode: {}", trophies.size(), dto.getTrophyCode());

        return "✅ Trophies saved successfully";
    }

    // ✅ Get all
    public List<Trophy> getAllTrophies() {
        logger.info("Fetching all trophies");
        return repository.findAll();
    }

    // ✅ Get trophies by trophyCode
    public List<Trophy> getTrophiesByTrophyCode(String trophyCode) {
        logger.info("Fetching trophies with code: {}", trophyCode);
        return repository.findByTrophyCode(trophyCode);
    }
    @Transactional
    public Trophy updateByTrophyCodeAndSize(String trophyCode, Double size, TrophyUpdateDTO.SizeDetail updateData, TrophyUpdateDTO generalData) {
        Trophy trophy = repository.findByTrophyCodeAndSize(trophyCode, size)
                .orElseThrow(() -> new RuntimeException("Trophy not found with code: " + trophyCode + " and size: " + size));

        if (updateData.getPrice() != null) trophy.setPrice(updateData.getPrice());
        if (updateData.getQuantity() != null) trophy.setQuantity(updateData.getQuantity());
        if (updateData.getColour() != null) trophy.setColour(updateData.getColour());
        if (updateData.getSoldPrice() != null) trophy.setSoldPrice(updateData.getSoldPrice());
        if (updateData.getSoldDate() != null) trophy.setSoldDate(updateData.getSoldDate());

        if (generalData.getLocation() != null) trophy.setLocation(generalData.getLocation());
        if (generalData.getDoe() != null) trophy.setDoe(generalData.getDoe());
        if (generalData.getImage() != null) trophy.setImage(generalData.getImage());

        return repository.save(trophy);
    }




    // ✅ Delete trophies by trophyCode
    @Transactional
    public void deleteByTrophyCodeAndSize(String trophyCode, Double size) {
        Trophy trophy = repository.findByTrophyCodeAndSize(trophyCode, size)
                .orElseThrow(() -> new RuntimeException("Trophy not found with code: " + trophyCode + " and size: " + size));

        repository.delete(trophy);
    }

}
