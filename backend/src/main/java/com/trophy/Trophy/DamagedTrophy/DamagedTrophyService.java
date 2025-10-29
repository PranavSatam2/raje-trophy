package com.trophy.Trophy.DamagedTrophy;

import com.trophy.Trophy.Trophy;
import com.trophy.Trophy.TrophyRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class DamagedTrophyService {

    private final DamagedTrophyRepository damagedTrophyRepository;
    private final TrophyRepository trophyRepository;

    public DamagedTrophyService(DamagedTrophyRepository damagedTrophyRepository,
                                TrophyRepository trophyRepository) {
        this.damagedTrophyRepository = damagedTrophyRepository;
        this.trophyRepository = trophyRepository;
    }

    // Create or Add SizeVariant to Trophy
    public DamagedTrophy addTrophy(String trophyCode, SizeVariantDamage sizeVariantDamage, MultipartFile imageFile) throws IOException {
        Optional<DamagedTrophy> existingTrophy = damagedTrophyRepository.findByTrophyCode(trophyCode);

        if (imageFile != null && !imageFile.isEmpty()) {
            sizeVariantDamage.setImage(imageFile.getBytes());
        }

        if (existingTrophy.isPresent()) {
            // Add new size to existing trophy
            DamagedTrophy trophy = existingTrophy.get();
            trophy.getSizes().add(sizeVariantDamage);
            return damagedTrophyRepository.save(trophy);
        } else {
            // Create new trophy
            DamagedTrophy trophy = new DamagedTrophy();
            trophy.setTrophyCode(trophyCode);
            trophy.getSizes().add(sizeVariantDamage);
            return damagedTrophyRepository.save(trophy);
        }
    }

    // Add multiple sizes + reduce quantity from main Trophy
    public DamagedTrophy addMultipleSizes(String trophyCode, List<SizeVariantDamage> sizeVariants, List<MultipartFile> imageFiles) throws IOException {
        DamagedTrophy trophy = damagedTrophyRepository.findByTrophyCode(trophyCode).orElse(new DamagedTrophy());
        trophy.setTrophyCode(trophyCode);

        for (int i = 0; i < sizeVariants.size(); i++) {
            SizeVariantDamage variant = sizeVariants.get(i);

            // Handle image upload
            if (imageFiles != null && imageFiles.size() > i) {
                MultipartFile imageFile = imageFiles.get(i);
                if (imageFile != null && !imageFile.isEmpty()) {
                    variant.setImage(imageFile.getBytes());
                }
            }

            trophy.getSizes().add(variant);

            // 🔽 Reduce stock from main Trophy if present
            Optional<Trophy> optionalMainTrophy = trophyRepository.findByTrophyCode(trophyCode);
            if (optionalMainTrophy.isPresent()) {
                Trophy mainTrophy = optionalMainTrophy.get();

                // Find matching size variant
                mainTrophy.getSizes().stream()
                        .filter(s -> s.getSize().equalsIgnoreCase(variant.getSize()))
                        .findFirst()
                        .ifPresent(sizeVariant -> {
                            if (sizeVariant.getQuantity() < variant.getQuantity()) {
                                throw new RuntimeException("Not enough stock to mark as damaged!");
                            }

                            int currentQty = sizeVariant.getQuantity();
                            int newQty = currentQty - variant.getQuantity();
                            sizeVariant.setQuantity(Math.max(newQty, 0)); // prevent negative quantity
                        });

                trophyRepository.save(mainTrophy);
            }
        }

        return damagedTrophyRepository.save(trophy);
    }


    // Get all trophies
    public List<DamagedTrophy> getAllTrophies() {
        return damagedTrophyRepository.findAll();
    }

    // Get by TrophyCode
    public Optional<DamagedTrophy> getTrophyByCode(String trophyCode) {
        return damagedTrophyRepository.findByTrophyCode(trophyCode);
    }

    public DamagedTrophy updateSizeVariant(String trophyCode, String size, SizeVariantDamage updatedSize, MultipartFile imageFile) throws IOException {
        Optional<DamagedTrophy> optionalTrophy = damagedTrophyRepository.findByTrophyCode(trophyCode);

        if (optionalTrophy.isPresent()) {
            DamagedTrophy trophy = optionalTrophy.get();

            // Find existing size
            SizeVariantDamage existingSize = trophy.getSizes()
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

            return damagedTrophyRepository.save(trophy);
        }

        throw new RuntimeException("Trophy with code " + trophyCode + " not found");
    }

    // Delete entire trophy
    public void deleteTrophy(String trophyCode) {
        damagedTrophyRepository.deleteByTrophyCode(trophyCode);
    }

    // Delete a specific size
    public DamagedTrophy deleteSizeVariant(String trophyCode, String size) {
        Optional<DamagedTrophy> optionalTrophy = damagedTrophyRepository.findByTrophyCode(trophyCode);
        if (optionalTrophy.isPresent()) {
            DamagedTrophy trophy = optionalTrophy.get();
            trophy.getSizes().removeIf(s -> s.getSize().equals(size));
            return damagedTrophyRepository.save(trophy);
        }
        return null;
    }

    // Get image for a specific trophyCode and size
    public byte[] getImageByTrophyCodeAndSize(String trophyCode, String size) {
        DamagedTrophy trophy = damagedTrophyRepository.findByTrophyCode(trophyCode)
                .orElseThrow(() -> new RuntimeException("Trophy not found with code: " + trophyCode));

        return trophy.getSizes().stream()
                .filter(variant -> variant.getSize().equalsIgnoreCase(size))
                .findFirst()
                .map(SizeVariantDamage::getImage)
                .orElseThrow(() -> new RuntimeException("Image not found for size: " + size));
    }


    // Service
    public SizeVariantDamage getSizeByTrophyCodeAndSize(String trophyCode, String size) {
        Optional<DamagedTrophy> optionalTrophy = damagedTrophyRepository.findByTrophyCode(trophyCode);
        if (optionalTrophy.isPresent()) {
            return optionalTrophy.get().getSizes().stream()
                    .filter(s -> s.getSize().equals(size))
                    .findFirst()
                    .orElse(null);
        }
        return null;
    }

}
