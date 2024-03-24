
USE book_shop;

-- insert data into books table
INSERT INTO books (title, author, price) VALUES
('The Alchemist', 'Paulo Coelho', 1000.00),
('The Da Vinci Code', 'Dan Brown', 1005.00),
('The Great Gatsby', 'F. Scott Fitzgerald', 120.00),
('To Kill a Mockingbird', 'Harper Lee', 800.00);

INSERT INTO users (id, email, password) VALUES
(1, 'user1@gmail.com', 'root'), -- password: root
(2, 'user2@gmail.com', 'root'); -- password: root

-- insert data into cart table
INSERT INTO cart (book_id, user_id) VALUES
(1, 1),
(2, 2);

-- insert data into orders table
INSERT INTO orders (book_id, user_id) VALUES
(1, 1),
(3, 2);
