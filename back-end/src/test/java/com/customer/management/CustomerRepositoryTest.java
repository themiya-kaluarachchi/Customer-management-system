package com.customer.management;

import com.customer.management.entity.Customer;
import com.customer.management.repository.CustomerRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class CustomerRepositoryTest {

    @Autowired
    private CustomerRepository customerRepository;

    @Test
    void testFindCustomer() {
        Customer customer = new Customer();
        customer.setName("Repo Test");
        customer.setNic("888888888888");
        customer.setDob(LocalDate.of(1999, 5, 5));

        customerRepository.save(customer);

        Customer found = customerRepository.findById(customer.getId()).orElse(null);

        assertNotNull(found);
        assertEquals("Repo Test", found.getName());
    }
}