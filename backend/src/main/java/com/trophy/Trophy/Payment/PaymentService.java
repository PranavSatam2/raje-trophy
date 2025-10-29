package com.trophy.Trophy.Payment;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    // Create
    public Payment createPayment(Payment payment) {
        return paymentRepository.save(payment);
    }
    // Save multiple payments
    public List<Payment> createMultiplePayments(List<Payment> payments) {
        return paymentRepository.saveAll(payments);
    }
    // Read All
    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    // Read by ID
    public Optional<Payment> getPaymentById(String id) {
        return paymentRepository.findById(id);
    }

    // Update
    public Payment updatePayment(String id, Payment updatedPayment) {
        return paymentRepository.findById(id)
                .map(existing -> {
                    existing.setPaymentDate(updatedPayment.getPaymentDate());
                    existing.setPaymentAmount(updatedPayment.getPaymentAmount());
                    existing.setTransactionId(updatedPayment.getTransactionId());
                    existing.setPaymentDoneBy(updatedPayment.getPaymentDoneBy());
                    existing.setPaymentWho(updatedPayment.getPaymentWho());
                    existing.setPaymentMethod(updatedPayment.getPaymentMethod());
                    return paymentRepository.save(existing);
                })
                .orElse(null);
    }

    // Delete
    public void deletePayment(String id) {
        paymentRepository.deleteById(id);
    }
}
