package com.trophy.Trophy;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class TrophyService {

    private final TrophyRepository trophyRepository;

    public TrophyService(TrophyRepository trophyRepository) {
        this.trophyRepository = trophyRepository;
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

    public Trophy updateSizeVariant(String trophyCode, String size, SizeVariant updatedSize, MultipartFile imageFile) throws IOException {
        Optional<Trophy> optionalTrophy = trophyRepository.findByTrophyCode(trophyCode);

        if (optionalTrophy.isPresent()) {
            Trophy trophy = optionalTrophy.get();

            // Find existing size
            SizeVariant existingSize = trophy.getSizes()
                    .stream()
                    .filter(s -> s.getSize().equals(size))
                    .findFirst()
                    .orElse(null);

            if (existingSize == null) {
                throw new RuntimeException("Size " + size + " not found for TrophyCode " + trophyCode);
            }

            // Update only changed fields
            existingSize.setPrice(updatedSize.getPrice());
            existingSize.setQuantity(updatedSize.getQuantity());
            existingSize.setColour(updatedSize.getColour());
            existingSize.setLocation(updatedSize.getLocation());
            existingSize.setSoldDate(updatedSize.getSoldDate());
            existingSize.setSoldPrice(updatedSize.getSoldPrice());
            existingSize.setDoe(updatedSize.getDoe());

            // Replace image only if a new one is provided
            if (imageFile != null && !imageFile.isEmpty()) {
                existingSize.setImage(imageFile.getBytes());
            }

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
        Optional<Trophy> optionalTrophy = trophyRepository.findByTrophyCode(trophyCode);
        if (optionalTrophy.isPresent()) {
            Trophy trophy = optionalTrophy.get();
            trophy.getSizes().removeIf(s -> s.getSize().equals(size));
            return trophyRepository.save(trophy);
        }
        return null;
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
