package com.trophy.Trophy;

import java.util.List;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import lombok.Data;

@Data
public class TrophyDTO {
    @NotBlank(message = "Trophy Code is required")
    private String trophyCode;

    @NotNull(message = "Size details are required")
    private List<SizeDetail> sizes;

    @Data
    public static class SizeDetail {
        private Double size;
        private Double price;
        private Integer quantity;
        private String colour;
        private String location;
        private String doe;
        private String image;
        private Double soldPrice;
        private String soldDate;


        public void setSoldPrice(Double soldPrice) {
            this.soldPrice = soldPrice;
        }

        public void setSoldDate(String soldDate) {
            this.soldDate = soldDate;
        }

        public Double getSoldPrice() {
            return soldPrice;
        }

        public String getSoldDate() {
            return soldDate;
        }


        public Double getSize() {
            return size;
        }

        public Double getPrice() {
            return price;
        }

        public Integer getQuantity() {
            return quantity;
        }

        public String getColour() {
            return colour;
        }

        public String getLocation() {
            return location;
        }

        public String getDoe() {
            return doe;
        }

        public String getImage() {
            return image;
        }

        public void setSize(Double size) {
            this.size = size;
        }

        public void setPrice(Double price) {
            this.price = price;
        }

        public void setQuantity(Integer quantity) {
            this.quantity = quantity;
        }

        public void setColour(String colour) {
            this.colour = colour;
        }

        public void setLocation(String location) {
            this.location = location;
        }

        public void setDoe(String doe) {
            this.doe = doe;
        }

        public void setImage(String image) {
            this.image = image;
        }
    }

    public @NotBlank(message = "Trophy Code is required") String getTrophyCode() {
        return trophyCode;
    }

    public @NotNull(message = "Size details are required") List<SizeDetail> getSizes() {
        return sizes;
    }

    public void setTrophyCode(@NotBlank(message = "Trophy Code is required") String trophyCode) {
        this.trophyCode = trophyCode;
    }

    public void setSizes(@NotNull(message = "Size details are required") List<SizeDetail> sizes) {
        this.sizes = sizes;
    }
}
