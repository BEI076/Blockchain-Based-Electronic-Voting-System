CREATE DATABASE votedb;
USE votedb;

CREATE TABLE Admin (
    a_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
    
);

INSERT INTO Admin (a_id, name) VALUES
(1, 'John Smith'),
(2, 'Mary Johnson'),
(3, 'David Lee');

CREATE TABLE Party (
    p_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255)
);

INSERT INTO Party (p_id, name) VALUES
(1, 'Democratic Party'),
(2, 'Republican Party'),
(3, 'Green Party');

CREATE TABLE Category (
    c_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255)
);

INSERT INTO Category (c_id, name) VALUES
(1, 'President'),
(2, 'Vice President'),
(3, 'Secetary');

CREATE TABLE Candidate (
    ca_id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    citizenshipid BIGINT NOT NULL,
    dob DATE NOT NULL,
    c_id INT NOT NULL,
    p_id INT NOT NULL,
    candidate_address VARCHAR(255) NOT NULL,
    PRIMARY KEY (ca_id),
    FOREIGN KEY (c_id) REFERENCES Category(c_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (p_id) REFERENCES Party(p_id) ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO Candidate (ca_id, name, address, citizenshipid, dob, c_id, p_id, candidate_address)
VALUES
(1, 'Jane Doe', '123 Main St', '1234567890', '1985-05-01', 1, 1, 'SDFSDF4534534FSDFS'),
(2, 'John Smith', '456 Elm St', '1234567890', '1980-08-15', 1, 2, 'SDFSDF4534534FSDFS'),
(3, 'Samantha Lee', '789 Oak St', '1234567890', '1990-01-30', 2, 1, 'SDFSDF4534534FSDFS'),
(4, 'James Johnson', '101 Maple St', '1234567890', '1975-11-22', 2,2, 'SDFSDF4534534FSDFS'),
(5, 'Robert Green', '222 Pine St', '1234567890', '1988-03-10', 3, 3, 'SDFSDF4534534FSDFS');



CREATE TABLE Voter (
    v_id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    citizenshipid BIGINT NOT NULL,
    dob DATE NOT NULL,
    password VARCHAR(255) NOT NULL,
    voter_address VARCHAR(255) NOT NULL,
    voter_id BIGINT NOT NULL,
    PRIMARY KEY (v_id)
);

INSERT INTO Voter (v_id, name, address, email, citizenshipid, dob, password, voter_address, voter_id)
VALUES
(1, 'Sarah Johnson', '123 Main St', 'sarah@example.com', '1234567890', '1990-01-15', 'password123', 'SDFSDF4534534FSDFS', 123456);

SELECT * FROM candidate;
SELECT * FROM candidate where p_id =1 and c_id = 2;
delete from category where c_id = 1;
SELECT * FROM voter;

DROP DATABASE votedb;


SELECT Candidate.ca_id, Candidate.name, Candidate.address,candidate.citizenshipid, candidate.dob, Category.name AS category_name, Party.name AS party_name
FROM Candidate
JOIN Category ON Candidate.c_id = Category.c_id
JOIN Party ON Candidate.p_id = Party.p_id;
