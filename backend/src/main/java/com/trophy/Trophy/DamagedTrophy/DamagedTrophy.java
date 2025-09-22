package com.trophy.Trophy.DamagedTrophy;

import com.trophy.Trophy.SizeVariant;
import jakarta.validation.Valid;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import jakarta.validation.constraints.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Document(collection = "damaged_trophy")
public class DamagedTrophy {

    @Id
    private String id;

    // This will be the unique identifier for a group of sizes
    private String trophyCode;

    // List of size variants for this trophy code
    private List<SizeVariantDamage> sizes = new ArrayList<>();

    // Getters and setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTrophyCode() {
        return trophyCode;
    }

    public void setTrophyCode(String trophyCode) {
        this.trophyCode = trophyCode;
    }

    public List<SizeVariantDamage> getSizes() {
        return sizes;
    }

    public void setSizes(List<SizeVariantDamage> sizes) {
        this.sizes = sizes;
    }
}
