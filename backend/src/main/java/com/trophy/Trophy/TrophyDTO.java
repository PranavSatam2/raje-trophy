package com.trophy.Trophy;


import jakarta.validation.constraints.*;
import java.util.Date;
import java.util.List;

public class TrophyDTO {

    @NotBlank(message = "Trophy code is required")
    private String trophyCode;

    @NotBlank(message = "Location is required")
    private String location;

    private Date doe;
    private String image;

    @NotEmpty(message = "At least one size detail is required")
    private List<SizeDetail> sizes;

    // ---------------------------
    // ✅ Inner class to hold size-specific details
    // ---------------------------
    public static class SizeDetail {

        @NotNull(message = "Size is required")
        @Positive(message = "Size must be positive")
        private Double size;

        @NotNull(message = "Price is required")
        @PositiveOrZero(message = "Price cannot be negative")
        private Double price;

        @NotNull(message = "Quantity is required")
        @Min(value = 0, message = "Quantity cannot be negative")
        private Integer quantity;

        @NotBlank(message = "Colour is required")
        private String colour;

        @PositiveOrZero(message = "Sold price cannot be negative")
        private Double soldPrice;

        private Date soldDate;

        // ✅ Getters & Setters
        public Double getSize() {
            return size;
        }

        public void setSize(Double size) {
            this.size = size;
        }

        public Double getPrice() {
            return price;
        }

        public void setPrice(Double price) {
            this.price = price;
        }

        public Integer getQuantity() {
            return quantity;
        }

        public void setQuantity(Integer quantity) {
            this.quantity = quantity;
        }

        public String getColour() {
            return colour;
        }

        public void setColour(String colour) {
            this.colour = colour;
        }

        public Double getSoldPrice() {
            return soldPrice;
        }

        public void setSoldPrice(Double soldPrice) {
            this.soldPrice = soldPrice;
        }

        public Date getSoldDate() {
            return soldDate;
        }

        public void setSoldDate(Date soldDate) {
            this.soldDate = soldDate;
        }
    }

    // ✅ Main DTO Getters & Setters

    public String getTrophyCode() {
        return trophyCode;
    }

    public void setTrophyCode(String trophyCode) {
        this.trophyCode = trophyCode;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Date getDoe() {
        return doe;
    }

    public void setDoe(Date doe) {
        this.doe = doe;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public List<SizeDetail> getSizes() {
        return sizes;
    }

    public void setSizes(List<SizeDetail> sizes) {
        this.sizes = sizes;
    }
}
