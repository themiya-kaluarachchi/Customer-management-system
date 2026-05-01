# CMS Lanka — Customer Management System

A full-stack Customer Management System built using **Spring Boot (Java 8)**, **React (Vite)**, and **MariaDB**.

This project was developed as a technical internship assignment for **Convergence Lanka (PVT) LTD** within a 4-day deadline.

---

## 🚀 Features

* Create, update, delete customers
* View full customer details
* Manage multiple phone numbers & addresses
* Family member relationships (self-referencing)
* Search customers by ID
* Bulk upload customers via Excel (.xlsx)
* Dashboard with statistics (total, phone, address)
* Responsive UI (mobile + desktop)

---

## 🛠 Tech Stack

### Backend

* Java 8
* Spring Boot 2.7
* Spring Data JPA (Hibernate)
* MariaDB
* Apache POI (Excel processing)

### Frontend

* React (Vite)
* Tailwind CSS v4
* Axios
* React Router DOM
* React Hot Toast
* React Icons

---

## 📦 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/themiya-kaluarachchi/Customer-management-system.git
cd project
```

---

### 2. Setup Database (MariaDB)

Create database:

```sql
CREATE DATABASE customer_db;
```

Run SQL file:

```sql
SOURCE DDL.sql;
SOURCE DML.sql;
```

---

### 3. Configure Backend

## 🔧 Configuration

1. Rename:
   application-example.properties → application.properties

2. Update your database credentials:

   spring.datasource.username=root
   spring.datasource.password=your_password

3. Make sure MariaDB is running on port 3306

---

### 4. Run Backend

```bash
cd back-end
mvn spring-boot:run
```

Backend runs on:

```
http://localhost:8080
```

---

### 5. Run Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

## 📡 API Endpoints

| Method | Endpoint              | Description           |
| ------ | --------------------- | --------------------- |
| GET    | /api/customers        | Get all customers     |
| GET    | /api/customers/{id}   | Get customer by ID    |
| POST   | /api/customers        | Create customer       |
| PUT    | /api/customers/{id}   | Update customer       |
| DELETE | /api/customers/{id}   | Delete customer       |
| POST   | /api/customers/upload | Bulk upload via Excel |

---

## 📊 Excel Upload

Endpoint:

```
POST /api/customers/upload
```

Sample file:

```
docs/sample-customers.xlsx
```

### Excel Format

| Column | Field                      |
| ------ | -------------------------- |
| A      | Name                       |
| B      | Date of Birth (YYYY-MM-DD) |
| C      | NIC                        |

---

## 🗄️ Database Design

* `customer` — main entity
* `customer_mobile` — stores phone numbers
* `customer_address` — stores addresses
* `customer_family` — self-referencing relationships

---

## 📌 Notes

* Phone and Address use one-to-many relationships
* Family members implemented using self-referencing relationship
* Java 8 compatibility maintained (no modern Java features used)
* Tailwind v4 used for styling (no tailwind.config.js)

---

## 👨‍💻 Author

**Themiya Kaluarachchi**
Software Engineering Undergraduate
