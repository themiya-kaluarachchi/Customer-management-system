CREATE DATABASE IF NOT EXISTS customer_db;
USE customer_db;

CREATE TABLE customers (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  date_of_birth DATE NOT NULL,
  name VARCHAR(255) NOT NULL,
  nic VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE phone (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  number VARCHAR(255),
  customer_id BIGINT,
  UNIQUE KEY (number),
  FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE
);

CREATE TABLE address (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  city VARCHAR(255),
  country VARCHAR(255),
  line1 VARCHAR(255),
  line2 VARCHAR(255),
  customer_id BIGINT,
  FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE
);

CREATE TABLE customer_family (
  customer_id BIGINT NOT NULL,
  family_member_id BIGINT NOT NULL,
  FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE,
  FOREIGN KEY (family_member_id) REFERENCES customers(id) ON DELETE CASCADE
);