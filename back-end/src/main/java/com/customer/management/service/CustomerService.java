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

            if (existing.getPhones() != null && updatedCustomer.getPhones() != null) {
                for (int i = 0; i < existing.getPhones().size(); i++) {
                    Phone existingPhone = existing.getPhones().get(i);
                    Phone updatedPhone = updatedCustomer.getPhones().get(i);

                    existingPhone.setNumber(updatedPhone.getNumber());
                }
            }

            if (existing.getAddresses() != null && updatedCustomer.getAddresses() != null) {
                for (int i = 0; i < existing.getAddresses().size(); i++) {
                    Address existingAddress = existing.getAddresses().get(i);
                    Address updatedAddress = updatedCustomer.getAddresses().get(i);

                    existingAddress.setLine1(updatedAddress.getLine1());
                    existingAddress.setLine2(updatedAddress.getLine2());
                    existingAddress.setCity(updatedAddress.getCity());
                    existingAddress.setCountry(updatedAddress.getCountry());
                }
            }

            return customerRepository.save(existing);
        }
        return null;
    }

    public void deleteCustomer(Long id) {
        customerRepository.deleteById(id);
    }
}
