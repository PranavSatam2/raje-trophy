package com.trophy.Trophy;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "trophies")
public class Trophy {

    @Id
    private String id;

    // This will be the unique identifier for a group of sizes
    private String trophyCode;

    // List of size variants for this trophy code
    private List<SizeVariant> sizes = new ArrayList<>();

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

    public List<SizeVariant> getSizes() {
        return sizes;
    }

    public void setSizes(List<SizeVariant> sizes) {
        this.sizes = sizes;
    }
}
