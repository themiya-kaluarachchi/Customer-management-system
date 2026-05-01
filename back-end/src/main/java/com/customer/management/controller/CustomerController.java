package com.customer.management.controller;

import com.customer.management.dto.UploadResponse;
import com.customer.management.entity.Customer;
import com.customer.management.service.CustomerService;
import com.customer.management.util.ExcelHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/customers")
@CrossOrigin
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @PostMapping
    public Customer  createCustomer(@Valid @RequestBody Customer customer) {
        return customerService.saveCustomer(customer);
    }

    @GetMapping
    public List<Customer> getAllCustomers() {
        return customerService.getAllCustomers();
    }

    @GetMapping("/{id}")
    public Customer getCustomerById(@PathVariable Long id) {
        return customerService.getCustomerById(id);
    }

    @PutMapping("/{id}")
    public Customer updateCustomer(@PathVariable Long id, @RequestBody Customer customer) {
        return customerService.updateCustomer(id, customer);
    }

    @DeleteMapping("/{id}")
    public void deleteCustomer(@PathVariable Long id) {
        customerService.deleteCustomer(id);
    }

    @PostMapping("/upload")
    public ResponseEntity<UploadResponse> uploadFile(@RequestParam("file") MultipartFile file) {

        List<String> errors = new ArrayList<>();
        int successCount = 0;

        try {
            List<Customer> customers = ExcelHelper.excelToCustomer(file.getInputStream());
            int totalRows = customers.size();

            for (int i = 0; i < customers.size(); i++) {
                try {
                    customerService.saveCustomer(customers.get(i));
                    successCount++;
                } catch (Exception e) {
                    errors.add("Row " + (i + 2) + ": " + e.getMessage()); // +2 = header row offset
                }
            }

            UploadResponse response = new UploadResponse(
                    totalRows,
                    successCount,
                    errors.size(),
                    errors
            );

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            UploadResponse response = new UploadResponse(
                    0,
                    0,
                    1,
                    Collections.singletonList("Failed to parse file: " + e.getMessage())
            );
            return ResponseEntity.badRequest().body(response);
        }
    }


    @GetMapping("/{id}/family")
    public ResponseEntity<List<Customer>> getFamilyMembers(@PathVariable Long id) {
        List<Customer> members = customerService.getFamilyMembers(id);
        return ResponseEntity.ok(members);
    }


    @PostMapping("/{id}/family/{memberId}")
    public ResponseEntity<Customer> addFamilyMember(
            @PathVariable Long id,
            @PathVariable Long memberId) {

        Customer updated = customerService.addFamilyMember(id, memberId);
        if (updated == null) return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        return ResponseEntity.ok(updated);
    }

    
    @DeleteMapping("/{id}/family/{memberId}")
    public ResponseEntity<Void> removeFamilyMember(
            @PathVariable Long id,
            @PathVariable Long memberId) {

        customerService.removeFamilyMember(id, memberId);
        return ResponseEntity.noContent().build();
    }
}

