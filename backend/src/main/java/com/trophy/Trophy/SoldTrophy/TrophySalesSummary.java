package com.trophy.Trophy.SoldTrophy;

public interface TrophySalesSummary {
    String getTrophyCode();
    String getMonth(); // format "YYYY-MM"
    Integer getTotalQuantity();
    Double getTotalPrice();
}