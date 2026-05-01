package com.customer.management.service;

import com.customer.management.entity.Address;
import com.customer.management.entity.Customer;
import com.customer.management.entity.Phone;
import com.customer.management.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
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

            existing.setPhones(updatedCustomer.getPhones());

            if (existing.getPhones() != null) {
                for (Phone phone : existing.getPhones()) {
                    phone.setCustomer(existing);
                }
            }

            existing.setAddresses(updatedCustomer.getAddresses());

            if (existing.getAddresses() != null) {
                for (Address address : existing.getAddresses()) {
                    address.setCustomer(existing);
                }
            }

            return customerRepository.save(existing);
        }

        return null;
    }


    public void deleteCustomer(Long id) {
        customerRepository.deleteById(id);
    }


    public List<Customer> saveAll(List<Customer> customers) {
        for (Customer customer : customers) {

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
        }
        return customerRepository.saveAll(customers);
    }

    public List<Customer> getFamilyMembers(Long id) {
        Customer customer = customerRepository.findById(id).orElse(null);
        if (customer == null) return Collections.emptyList();
        return customer.getFamilyMembers();
    }


    public Customer addFamilyMember(Long id, Long memberId) {
        Customer customer = customerRepository.findById(id).orElse(null);
        Customer member   = customerRepository.findById(memberId).orElse(null);

        if (customer == null || member == null) return null;
        if (customer.getId().equals(memberId)) return null; // can't link to self

        // Link both directions so the relationship is symmetric
        if (!customer.getFamilyMembers().contains(member)) {
            customer.getFamilyMembers().add(member);
        }
        if (!member.getFamilyMembers().contains(customer)) {
            member.getFamilyMembers().add(customer);
        }

        customerRepository.save(member);
        return customerRepository.save(customer);
    }


    public Customer removeFamilyMember(Long id, Long memberId) {
        Customer customer = customerRepository.findById(id).orElse(null);
        Customer member   = customerRepository.findById(memberId).orElse(null);

        if (customer == null || member == null) return null;

        // Remove both directions
        customer.getFamilyMembers().remove(member);
        member.getFamilyMembers().remove(customer);

        customerRepository.save(member);
        return customerRepository.save(customer);
    }
}
