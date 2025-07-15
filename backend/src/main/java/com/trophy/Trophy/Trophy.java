package com.trophy.Trophy;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.util.Date;

@Table(name = "Trophy")
@Entity
public class Trophy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Trophy code is required")
    @Column() // allow multiple entries with same trophy code but different size
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

    // ---------------------------
    // ✅ Constructors
    // ---------------------------

    public Trophy() {
    }

    public Trophy(Long id, String trophyCode, Double size, Double price, Integer quantity, String colour,
                  String location, Date doe, String image, Double soldPrice, Date soldDate) {
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
    }

    // ---------------------------
    // ✅ Getters and Setters
    // ---------------------------

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTrophyCode() {
        return trophyCode;
    }

    public void setTrophyCode(String trophyCode) {
        this.trophyCode = trophyCode;
    }

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

    // ---------------------------
    // ✅ Builder Pattern
    // ---------------------------

    public static TrophyBuilder builder() {
        return new TrophyBuilder();
    }

    public static class TrophyBuilder {
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

        public TrophyBuilder id(Long id) {
            this.id = id;
            return this;
        }

        public TrophyBuilder trophyCode(String trophyCode) {
            this.trophyCode = trophyCode;
            return this;
        }

        public TrophyBuilder size(Double size) {
            this.size = size;
            return this;
        }

        public TrophyBuilder price(Double price) {
            this.price = price;
            return this;
        }

        public TrophyBuilder quantity(Integer quantity) {
            this.quantity = quantity;
            return this;
        }

        public TrophyBuilder colour(String colour) {
            this.colour = colour;
            return this;
        }

        public TrophyBuilder location(String location) {
            this.location = location;
            return this;
        }

        public TrophyBuilder doe(Date doe) {
            this.doe = doe;
            return this;
        }

        public TrophyBuilder image(String image) {
            this.image = image;
            return this;
        }

        public TrophyBuilder soldPrice(Double soldPrice) {
            this.soldPrice = soldPrice;
            return this;
        }

        public TrophyBuilder soldDate(Date soldDate) {
            this.soldDate = soldDate;
            return this;
        }

        public Trophy build() {
            return new Trophy(id, trophyCode, size, price, quantity, colour, location, doe, image, soldPrice, soldDate);
        }
    }
}
