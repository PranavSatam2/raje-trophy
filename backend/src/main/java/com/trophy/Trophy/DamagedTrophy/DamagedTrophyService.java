package com.trophy.Trophy.DamagedTrophy;

import com.trophy.Trophy.DamagedTrophy.DamagedTrophyDTO.SizeDetail;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DamagedTrophyService {

    private static final Logger logger = LoggerFactory.getLogger(DamagedTrophyService.class);

    @Autowired
    private DamagedTrophyRepository repository;

    // ✅ Save multiple damaged trophies with sizes
    public String saveMultipleDamagedTrophies(DamagedTrophyDTO dto) {
        logger.info("Saving damaged trophies for trophyCode: {}", dto.getTrophyCode());

        List<DamagedTrophy> damagedTrophies = dto.getSizes().stream().map(size -> {
            DamagedTrophy d = new DamagedTrophy();
            d.setTrophyCode(dto.getTrophyCode());
            d.setLocation(size.getLocation());
            d.setDoe(size.getDoe());
            d.setImage(size.getImage());
            d.setSize(size.getSize());
            d.setPrice(size.getPrice());
            d.setQuantity(size.getQuantity());
            d.setColour(size.getColour());
            d.setSoldDate(size.getSoldDate());
            d.setSoldPrice(size.getSoldPrice());
            d.setRemark(size.getRemark());
            return d;
        }).collect(Collectors.toList());

        repository.saveAll(damagedTrophies);
        logger.debug("Saved {} damaged trophies for trophyCode: {}", damagedTrophies.size(), dto.getTrophyCode());

        return "✅ Damaged trophies saved successfully";
    }

    // ✅ Get all damaged trophies
    public List<DamagedTrophy> getAllDamagedTrophies() {
        logger.info("Fetching all damaged trophies");
        return repository.findAll();
    }

    // ✅ Get one by ID
    public List<DamagedTrophy> getDamagedTrophiesByTrophyCode(String trophyCode) {
        logger.info("Fetching damaged trophies with trophyCode: {}", trophyCode);
        List<DamagedTrophy> list = repository.findByTrophyCode(trophyCode);
        if (list.isEmpty()) {
            logger.warn("No damaged trophies found for trophyCode: {}", trophyCode);
            throw new RuntimeException("No damaged trophies found for trophyCode: " + trophyCode);
        }
        return list;
    }


    @Transactional
    public String updateByTrophyCodeAndSize(String trophyCode, Double size, DamagedTrophyDTO.SizeDetail sizeDetail) {
        DamagedTrophy existing = repository.findByTrophyCodeAndSize(trophyCode, size)
                .orElseThrow(() -> new RuntimeException("No damaged trophy found with trophyCode: " + trophyCode + " and size: " + size));

        if (sizeDetail.getPrice() != null) existing.setPrice(sizeDetail.getPrice());
        if (sizeDetail.getQuantity() != null) existing.setQuantity(sizeDetail.getQuantity());
        if (sizeDetail.getColour() != null) existing.setColour(sizeDetail.getColour());
        if (sizeDetail.getSoldPrice() != null) existing.setSoldPrice(sizeDetail.getSoldPrice());
        if (sizeDetail.getSoldDate() != null) existing.setSoldDate(sizeDetail.getSoldDate());
        if (sizeDetail.getRemark() != null) existing.setRemark(sizeDetail.getRemark());

        repository.save(existing);
        return "✅ Damaged trophy updated for trophyCode: " + trophyCode + " and size: " + size;
    }



    // ✅ Delete by ID
    @Transactional
    public void deleteByTrophyCodeAndSize(String trophyCode, Double size) {
        repository.deleteByTrophyCodeAndSize(trophyCode, size);
    }


}
