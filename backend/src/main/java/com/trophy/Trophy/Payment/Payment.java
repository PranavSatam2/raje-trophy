package com.trophy.Trophy.Payment;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "payments")
public class Payment {

    @Id
    private String id;
    private String paymentDate;
    private Double paymentAmount;
    private String transactionId;
    private String paymentDoneBy;
    private String paymentWho;
    private String paymentMethod;
}

