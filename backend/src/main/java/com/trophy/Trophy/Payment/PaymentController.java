package com.trophy.Trophy.Payment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = "*")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping("/bulk")
    public List<Payment> createMultiplePayments(@RequestBody List<Payment> payments) {
        return paymentService.createMultiplePayments(payments);
    }

    // Create
    @PostMapping
    public Payment createPayment(@RequestBody Payment payment) {
        return paymentService.createPayment(payment);
    }

    // Read All
    @GetMapping
    public List<Payment> getAllPayments() {
        return paymentService.getAllPayments();
    }

    // Read by ID
    @GetMapping("/{id}")
    public Optional<Payment> getPaymentById(@PathVariable String id) {
        return paymentService.getPaymentById(id);
    }

    // Update
    @PutMapping("/{id}")
    public Payment updatePayment(@PathVariable String id, @RequestBody Payment payment) {
        return paymentService.updatePayment(id, payment);
    }

    // Delete
    @DeleteMapping("/{id}")
    public String deletePayment(@PathVariable String id) {
        paymentService.deletePayment(id);
        return "Payment deleted successfully with id: " + id;
    }
}
