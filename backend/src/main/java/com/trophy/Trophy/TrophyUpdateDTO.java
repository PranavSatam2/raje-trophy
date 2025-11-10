package com.trophy.Trophy;


import java.util.Date;
import java.util.List;

public class TrophyUpdateDTO {
    private String location;
    private Date doe;
    private String image;
    private List<SizeDetail> sizes;

    public static class SizeDetail {
        private Double size;
        private Double price;
        private Integer quantity;
        private String colour;
        private Double soldPrice;
        private Date soldDate;
        private String salePrice;

        // Getters & Setters
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

        public String getSalePrice() {
            return salePrice;
        }
        public void setSalePrice(String salePrice) {
            this.salePrice = salePrice;
        }
    }

    // Getters & Setters for main DTO
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
