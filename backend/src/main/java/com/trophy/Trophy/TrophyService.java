package com.trophy.Trophy;

import com.trophy.Trophy.SoldTrophy.SoldTrophy;
import com.trophy.Trophy.SoldTrophy.SoldTrophyRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class TrophyService {

    private final TrophyRepository trophyRepository;

    private final SoldTrophyRepository soldTrophyRepository;

    public TrophyService(TrophyRepository trophyRepository, SoldTrophyRepository soldTrophyRepository) {
        this.trophyRepository = trophyRepository;
        this.soldTrophyRepository = soldTrophyRepository;
    }

    // Create or Add SizeVariant to Trophy
    public Trophy addTrophy(String trophyCode, SizeVariant sizeVariant, MultipartFile imageFile) throws IOException {
        Optional<Trophy> existingTrophy = trophyRepository.findByTrophyCode(trophyCode);

        if (imageFile != null && !imageFile.isEmpty()) {
            sizeVariant.setImage(imageFile.getBytes());
        }

        if (existingTrophy.isPresent()) {
            // Add new size to existing trophy
            Trophy trophy = existingTrophy.get();
            trophy.getSizes().add(sizeVariant);
            return trophyRepository.save(trophy);
        } else {
            // Create new trophy
            Trophy trophy = new Trophy();
            trophy.setTrophyCode(trophyCode);
            trophy.getSizes().add(sizeVariant);
            return trophyRepository.save(trophy);
        }
    }

    public Trophy addMultipleSizes(String trophyCode, List<SizeVariant> sizeVariants, List<MultipartFile> imageFiles) throws IOException {
        Trophy trophy = trophyRepository.findByTrophyCode(trophyCode).orElse(new Trophy());
        trophy.setTrophyCode(trophyCode);

        for (int i = 0; i < sizeVariants.size(); i++) {
            SizeVariant variant = sizeVariants.get(i);

            if (imageFiles != null && imageFiles.size() > i) {
                MultipartFile imageFile = imageFiles.get(i);
                if (imageFile != null && !imageFile.isEmpty()) {
                    variant.setImage(imageFile.getBytes());
                }
            }

            trophy.getSizes().add(variant);
        }

        return trophyRepository.save(trophy);
    }


    // Get all trophies
    public List<Trophy> getAllTrophies() {
        return trophyRepository.findAll();
    }

    // Get by TrophyCode
    public Optional<Trophy> getTrophyByCode(String trophyCode) {
        return trophyRepository.findByTrophyCode(trophyCode);
    }

    public Trophy updateAndSellTrophy(String trophyCode, String size, SizeVariant updatedSize, MultipartFile imageFile) throws IOException {
        Optional<Trophy> optionalTrophy = trophyRepository.findByTrophyCode(trophyCode);

        if (optionalTrophy.isPresent()) {
            Trophy trophy = optionalTrophy.get();

            SizeVariant existingSize = trophy.getSizes()
                    .stream()
                    .filter(s -> s.getSize().equals(size))
                    .findFirst()
                    .orElseThrow(() -> new RuntimeException("Size not found"));

            // calculate new quantity
            int soldQuantity = updatedSize.getSoldQuantity() != null ? updatedSize.getSoldQuantity() : 0;
            int newQuantity = existingSize.getQuantity() - soldQuantity;
            if (newQuantity < 0) throw new RuntimeException("Sold quantity exceeds available quantity");

            existingSize.setQuantity(newQuantity);
            existingSize.setSoldDate(updatedSize.getSoldDate());
            existingSize.setSoldPrice(updatedSize.getSoldPrice());
            existingSize.setSoldQuantity(soldQuantity);
            existingSize.setSoldCurrentQuantityPrice(updatedSize.getSoldCurrentQuantityPrice());
            existingSize.setColour(updatedSize.getColour());
            existingSize.setLocation(updatedSize.getLocation());
            existingSize.setPrice(updatedSize.getPrice());
            existingSize.setDoe(updatedSize.getDoe());
            existingSize.setSalePrice(updatedSize.getSalePrice());

            if (imageFile != null && !imageFile.isEmpty()) {
                existingSize.setImage(imageFile.getBytes());
            }

            // ✅ Save sold record separately
            SoldTrophy soldTrophy = new SoldTrophy();
            soldTrophy.setTrophyCode(trophyCode);
            soldTrophy.setSize(size);
            soldTrophy.setColour(existingSize.getColour());
            soldTrophy.setLocation(existingSize.getLocation());
            soldTrophy.setSoldDate(updatedSize.getSoldDate());
            soldTrophy.setSoldPrice(updatedSize.getSoldPrice());
            soldTrophy.setSoldQuantity(soldQuantity);
            soldTrophy.setSoldCurrentQuantityPrice(updatedSize.getSoldCurrentQuantityPrice());
            soldTrophy.setImage(existingSize.getImage());

            soldTrophyRepository.save(soldTrophy);

            return trophyRepository.save(trophy);
        }

        throw new RuntimeException("Trophy with code " + trophyCode + " not found");
    }


    // Delete entire trophy
    public void deleteTrophy(String trophyCode) {
        trophyRepository.deleteByTrophyCode(trophyCode);
    }

    // Delete a specific size
    public Trophy deleteSizeVariant(String trophyCode, String size) {
        Trophy trophy = trophyRepository.findByTrophyCode(trophyCode)
                .orElseThrow(() -> new RuntimeException("Trophy not found"));

        // Remove that size
        trophy.getSizes().removeIf(s -> String.valueOf(s.getSize()).equals(size));

        // If no sizes left, delete trophy completely
        if (trophy.getSizes().isEmpty()) {
            trophyRepository.delete(trophy);
            return null; // Return null so controller knows trophy is fully deleted
        }

        return trophyRepository.save(trophy);
    }


    // Get image for a specific trophyCode and size
    public byte[] getImageByTrophyCodeAndSize(String trophyCode, String size) {
        Trophy trophy = trophyRepository.findByTrophyCode(trophyCode)
                .orElseThrow(() -> new RuntimeException("Trophy not found with code: " + trophyCode));

        return trophy.getSizes().stream()
                .filter(variant -> variant.getSize().equalsIgnoreCase(size))
                .findFirst()
                .map(SizeVariant::getImage)
                .orElseThrow(() -> new RuntimeException("Image not found for size: " + size));
    }


    // Service
    public SizeVariant getSizeByTrophyCodeAndSize(String trophyCode, String size) {
        Optional<Trophy> optionalTrophy = trophyRepository.findByTrophyCode(trophyCode);
        if (optionalTrophy.isPresent()) {
            return optionalTrophy.get().getSizes().stream()
                    .filter(s -> s.getSize().equals(size))
                    .findFirst()
                    .orElse(null);
        }
        return null;
    }

}
