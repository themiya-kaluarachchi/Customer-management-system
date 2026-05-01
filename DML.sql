USE customer_db;

INSERT INTO customers (id, date_of_birth, name, nic) VALUES
(1, '2001-03-13', 'Ushan Bandara', '20018751652'),
(2, '2001-05-08', 'Thisaru Dulaksha', '20154626875'),
(3, '1998-05-12', 'Kasun Perera', '19981234567'),
(4, '1995-11-23', 'Nuwan Kumara', '19954567890'),
(5, '2002-01-15', 'Chamara Silva', '20021234567');

INSERT INTO phone (id, number, customer_id) VALUES
(1, '0788169210', 1),
(2, '0788169219', 2),
(3, '0775676373', 3),
(4, '0710711890', 4),
(5, '0710711850', 5);

INSERT INTO address (id, city, country, line1, line2, customer_id) VALUES
(1, 'Kegalle', 'Sri Lanka', 'Dewalegama', 'Polgahawela', 1),
(2, 'Ruwanwella', 'Sri Lanka', 'Kandewaththa', 'Kabulumulle', 2),
(3, 'Ruwanwella', 'Sri Lanka', 'Wendala', 'Karawanella', 3),
(4, 'Colombo', 'Sri Lanka', 'Kiribathgoda', 'Beruwala', 4),
(5, 'Yatiyanthota', 'Sri Lanka', 'Habellawaka', '', 5);

INSERT INTO customer_family (customer_id, family_member_id) VALUES
(1, 2),
(2, 1),
(1, 3),
(3, 1);