package com.trophy.Trophy.DamagedTrophy;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import jakarta.validation.constraints.*;
import java.util.Date;

@Document(collection = "damaged_trophy") // MongoDB collection name
public class DamagedTrophy {

    @Id
    private String id; // MongoDB ObjectId as String

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

    private Date doe; // Date of entry

    private String image; // Image URL or path

    @PositiveOrZero(message = "Sold price cannot be negative")
    private Double soldPrice;

    private Date soldDate;

    private String remark;

    public DamagedTrophy() {}

    public DamagedTrophy(String id, String trophyCode, Double size, Double price, Integer quantity, String colour,
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
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

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
}
