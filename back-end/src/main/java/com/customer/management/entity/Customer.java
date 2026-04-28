package com.customer.management.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "customers")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private LocalDate dob;

    @Column(unique = true)
    private String nic;

    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL)
    private List<Phone>  phones;

    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL)
    private List<Address> addresses;
}
