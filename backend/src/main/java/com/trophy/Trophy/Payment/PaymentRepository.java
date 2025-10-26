package com.trophy.Trophy.Payment;


import org.springframework.data.mongodb.repository.MongoRepository;
import com.trophy.Trophy.Payment.Payment;

public interface PaymentRepository extends MongoRepository<Payment, String> {
}

