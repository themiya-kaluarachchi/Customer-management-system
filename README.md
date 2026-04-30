# Customer Management System

## 🚀 Features

* Create, update, delete customers
* Manage phone numbers and addresses
* Bulk upload customers via Excel
* Input validation and error handling

## 🛠 Tech Stack

* Java 8
* Spring Boot
* Spring Data JPA
* MariaDB
* Apache POI

## 📦 Setup Instructions

1. Clone the repository
2. Create database: `customer_db`
3. Configure `application.properties`
4. Run the project:

   ```
   mvn spring-boot:run
   ```

## 📊 Excel Upload

Endpoint:

```
POST /api/customers/upload
```

Use file:

```
docs/sample-customers.xlsx
```

## 📌 Notes

* Phone and Address support one-to-many relationships
* Family members implemented as self-referencing relationship
