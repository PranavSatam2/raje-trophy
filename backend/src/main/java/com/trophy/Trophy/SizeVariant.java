package com.trophy.Trophy;

import org.springframework.web.multipart.MultipartFile;

public class SizeVariant {

    private String size;
    private double price;
    private String description;
    private int quantity;
    private String colour;
    private String location;
    private String soldDate;
    private Double soldPrice;

    // Image will be stored as byte[] in MongoDB
    private byte[] image;

    public String getSize() {
        return size;
    }
    public void setSize(String size) {
        this.size = size;
    }

    public double getPrice() {
        return price;
    }
    public void setPrice(double price) {
        this.price = price;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getQuantity() {
        return quantity;
    }
    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public String getColour() {
        return colour;
    }
    public void setColour(String colour) {
        this.colour = colour;
    }

    public String getLocation() {
        return location;
    }
    public void setLocation(String location) {
        this.location = location;
    }

    public String getSoldDate() {
        return soldDate;
    }
    public void setSoldDate(String soldDate) {
        this.soldDate = soldDate;
    }

    public Double getSoldPrice() {
        return soldPrice;
    }
    public void setSoldPrice(Double soldPrice) {
        this.soldPrice = soldPrice;
    }

    public byte[] getImage() {
        return image;
    }
    public void setImage(byte[] image) {
        this.image = image;
    }
}
