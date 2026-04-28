package com.customer.management.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String line1;
    private String line2;

    private String city;
    private String country;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;
}
