package com.customer.management.service;

import com.customer.management.entity.Address;
import com.customer.management.entity.Customer;
import com.customer.management.entity.Phone;
import com.customer.management.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;


    public Customer saveCustomer(Customer customer) {

        if (customer.getPhones() != null) {
            for (Phone phone : customer.getPhones()) {
                phone.setCustomer(customer);
            }
        }

        if (customer.getAddresses() != null) {
            for (Address address : customer.getAddresses()) {
                address.setCustomer(customer);
            }
        }
        return customerRepository.save(customer);
    }


    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }


    public Customer getCustomerById(Long id) {
        return customerRepository.findById(id).orElse(null);
    }


    public Customer updateCustomer(Long id, Customer updatedCustomer) {
        Customer existing = customerRepository.findById(id).orElse(null);

        if (existing != null) {
            existing.setName(updatedCustomer.getName());
            existing.setDob(updatedCustomer.getDob());
            existing.setNic(updatedCustomer.getNic());

            return customerRepository.save(existing);
        }
        return null;
    }

    public void deleteCustomer(Long id) {
        customerRepository.deleteById(id);
    }
}
