package com.trophy.Trophy;

import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StoreAccService {

    private static final Logger logger = LoggerFactory.getLogger(StoreAccService.class);

    @Autowired
    private StoreAccRepository repository;

    public List<Trophy> getAllStoreAcceptances() {
        logger.info("Fetching all store data");
        List<Trophy> storeAcceptances = repository.findAll();
        logger.debug("Total store data retrieved: {}", storeAcceptances.size());
        return storeAcceptances;
    }

    public Trophy getStoreAcceptanceById(Long id) {
        logger.info("Fetching store data with ID: {}", id);
        return repository.findById(id)
                .orElseGet(() -> {
                    logger.warn("Store data with ID {} not found", id);
                    return null;
                });
    }

    public Trophy saveStoreAcceptance(Trophy storeAcceptance) {
        logger.info("Saving new store data with partNum: {}", storeAcceptance.getTrophyCode());
        Trophy savedStoreAcc = repository.save(storeAcceptance);
        logger.debug("Store data saved successfully with ID: {}", savedStoreAcc.getTrophyCode());
        return savedStoreAcc;
    }


    public Trophy updateStoreAcceptance(Long id, Trophy storeAcceptance) {
        logger.info("Updating store acceptance with ID: {}", id);
        Optional<Trophy> existingOptional = repository.findById(id);

        if (existingOptional.isPresent()) {
            Trophy existing = existingOptional.get();

            existing.setTrophyCode(storeAcceptance.getTrophyCode());
            existing.setSize(storeAcceptance.getSize());
            existing.setPrice(storeAcceptance.getPrice());
            existing.setQuantity(storeAcceptance.getQuantity());
            existing.setColour(storeAcceptance.getColour());
            existing.setLocation(storeAcceptance.getLocation());
            existing.setDoe(storeAcceptance.getDoe());
            existing.setImage(storeAcceptance.getImage());

            Trophy updated = repository.save(existing);
            logger.debug("Store updated successfully with ID: {}", id);
            return updated;
        }

        logger.warn("Store data with ID {} not found, update failed", id);
        throw new RuntimeException("Trophy with ID " + id + " not found");
    }

    public void deleteStoreAcceptance(Long id) {
        logger.info("Deleting store data with ID: {}", id);
        repository.deleteById(id);
        logger.debug("Store data deleted successfully with ID: {}", id);
    }
}
