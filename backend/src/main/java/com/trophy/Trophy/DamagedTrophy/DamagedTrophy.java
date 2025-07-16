// Model: DamagedTrophy.java
package com.trophy.Trophy.DamagedTrophy;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.util.Date;

@Table(name = "DamagedTrophy")
@Entity
public class DamagedTrophy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Trophy code is required")
    private String trophyCode;

    @NotNull(message = "Size is required")
    @Positive(message = "Size must be a positive number")
    private Double size;

    @NotNull(message = "Price is required")
    @PositiveOrZero(message = "Price cannot be negative")
    private Double price;

    @NotNull(message = "Quantity is required")
    @Min(value = 0, message = "Quantity cannot be negative")
    private Integer quantity;

    @NotBlank(message = "Colour is required")
    private String colour;

    @NotBlank(message = "Location is required")
    private String location;

    @Temporal(TemporalType.DATE)
    @Column(name = "doe")
    private Date doe;

    @Column(name = "inspection_report", length = 500)
    private String image;

    @PositiveOrZero(message = "Sold price cannot be negative")
    private Double soldPrice;

    @Temporal(TemporalType.DATE)
    @Column(name = "sold_date")
    private Date soldDate;

    @Column(name = "remark", length = 500)
    private String remark;

    public DamagedTrophy() {}

    public DamagedTrophy(Long id, String trophyCode, Double size, Double price, Integer quantity, String colour,
                         String location, Date doe, String image, Double soldPrice, Date soldDate, String remark) {
        this.id = id;
        this.trophyCode = trophyCode;
        this.size = size;
        this.price = price;
        this.quantity = quantity;
        this.colour = colour;
        this.location = location;
        this.doe = doe;
        this.image = image;
        this.soldPrice = soldPrice;
        this.soldDate = soldDate;
        this.remark = remark;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTrophyCode() { return trophyCode; }
    public void setTrophyCode(String trophyCode) { this.trophyCode = trophyCode; }

    public Double getSize() { return size; }
    public void setSize(Double size) { this.size = size; }

    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }

    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }

    public String getColour() { return colour; }
    public void setColour(String colour) { this.colour = colour; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public Date getDoe() { return doe; }
    public void setDoe(Date doe) { this.doe = doe; }

    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }

    public Double getSoldPrice() { return soldPrice; }
    public void setSoldPrice(Double soldPrice) { this.soldPrice = soldPrice; }

    public Date getSoldDate() { return soldDate; }
    public void setSoldDate(Date soldDate) { this.soldDate = soldDate; }

    public String getRemark() { return remark; }
    public void setRemark(String remark) { this.remark = remark; }

    // Builder
    public static DamagedTrophyBuilder builder() { return new DamagedTrophyBuilder(); }

    public static class DamagedTrophyBuilder {
        private Long id;
        private String trophyCode;
        private Double size;
        private Double price;
        private Integer quantity;
        private String colour;
        private String location;
        private Date doe;
        private String image;
        private Double soldPrice;
        private Date soldDate;
        private String remark;

        public DamagedTrophyBuilder id(Long id) { this.id = id; return this; }
        public DamagedTrophyBuilder trophyCode(String trophyCode) { this.trophyCode = trophyCode; return this; }
        public DamagedTrophyBuilder size(Double size) { this.size = size; return this; }
        public DamagedTrophyBuilder price(Double price) { this.price = price; return this; }
        public DamagedTrophyBuilder quantity(Integer quantity) { this.quantity = quantity; return this; }
        public DamagedTrophyBuilder colour(String colour) { this.colour = colour; return this; }
        public DamagedTrophyBuilder location(String location) { this.location = location; return this; }
        public DamagedTrophyBuilder doe(Date doe) { this.doe = doe; return this; }
        public DamagedTrophyBuilder image(String image) { this.image = image; return this; }
        public DamagedTrophyBuilder soldPrice(Double soldPrice) { this.soldPrice = soldPrice; return this; }
        public DamagedTrophyBuilder soldDate(Date soldDate) { this.soldDate = soldDate; return this; }
        public DamagedTrophyBuilder remark(String remark) { this.remark = remark; return this; }

        public DamagedTrophy build() {
            return new DamagedTrophy(id, trophyCode, size, price, quantity, colour, location, doe, image, soldPrice, soldDate, remark);
        }
    }
}
