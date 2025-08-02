package com.trophy.Trophy;

import java.sql.Date;
import java.time.ZoneId;
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
            // Parse DOE safely
            if (sizeDetail.getDoe() != null && !sizeDetail.getDoe().isEmpty()) {
                trophy.setDoe(Date.valueOf(sizeDetail.getDoe())); // only if doe is string in "yyyy-MM-dd"
            }
            trophy.setImage(sizeDetail.getImage());

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

    //Upadte the trophy by the code and size
    @Transactional
    public Trophy updateByTrophyCodeAndSize(String trophyCode, Double size, TrophyDTO.SizeDetail updatedDTO) {
        Trophy existingTrophy = repository.findByTrophyCodeAndSize(trophyCode, size)
                .orElseThrow(() -> new RuntimeException(
                        " Trophy not found with code: " + trophyCode + " and size: " + size));

        if (updatedDTO.getPrice() != null) existingTrophy.setPrice(updatedDTO.getPrice());
        if (updatedDTO.getQuantity() != null) existingTrophy.setQuantity(updatedDTO.getQuantity());
        if (updatedDTO.getColour() != null) existingTrophy.setColour(updatedDTO.getColour());
        if (updatedDTO.getLocation() != null) existingTrophy.setLocation(updatedDTO.getLocation());
        if (updatedDTO.getImage() != null) existingTrophy.setImage(updatedDTO.getImage());

        //  Convert String -> Date here
        if (updatedDTO.getDoe() != null) existingTrophy.setDoe(parseDate(updatedDTO.getDoe()));
        if (updatedDTO.getSoldDate() != null) existingTrophy.setSoldDate(parseDate(updatedDTO.getSoldDate()));
        if (updatedDTO.getSoldPrice() != null) existingTrophy.setSoldPrice(updatedDTO.getSoldPrice());

        return repository.save(existingTrophy);
    }

    private Date parseDate(String dateStr) {
        if (dateStr == null || dateStr.trim().isEmpty()) return null;

        try {
            //  ISO-8601 with timezone (2025-08-01T11:12:34.535+05:30)
            return (Date) Date.from(java.time.OffsetDateTime.parse(dateStr).toInstant());
        } catch (Exception ignored) {}

        try {
            //  ISO-8601 without timezone (2025-08-01T11:12:34.535)
            return (Date) Date.from(java.time.LocalDateTime.parse(dateStr).atZone(ZoneId.systemDefault()).toInstant());
        } catch (Exception ignored) {}

        try {
            //  yyyy-MM-dd (simple case)
            return java.sql.Date.valueOf(dateStr);
        } catch (Exception ignored) {}

        throw new RuntimeException(" Date format not supported. Allowed: yyyy-MM-dd or ISO (yyyy-MM-dd'T'HH:mm:ss[.SSS][XXX])");
    }

    // ✅ Delete trophies by trophyCode
    @Transactional
    public void deleteByTrophyCodeAndSize(String trophyCode, Double size) {
        Trophy trophy = repository.findByTrophyCodeAndSize(trophyCode, size)
                .orElseThrow(() -> new RuntimeException("Trophy not found with code: " + trophyCode + " and size: " + size));

        repository.delete(trophy);
    }

}
