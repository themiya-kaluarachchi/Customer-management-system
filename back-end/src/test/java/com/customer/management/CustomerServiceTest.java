package com.customer.management;

import com.customer.management.entity.Customer;
import com.customer.management.repository.CustomerRepository;
import com.customer.management.service.CustomerService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class CustomerServiceTest {

    @Autowired
    private CustomerService customerService;

    @Autowired
    private CustomerRepository customerRepository;

    @Test
    void testCreateCustomer() {
        Customer customer = new Customer();
        customer.setName("Test User");
        customer.setNic("999999999999");
        customer.setDob(LocalDate.of(2000, 1, 1));

        Customer saved = customerService.saveCustomer(customer);

        assertNotNull(saved.getId());
        assertEquals("Test User", saved.getName());
    }
}