

CREATE TABLE Admin (
    a_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE Party (
    p_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255)
);

CREATE TABLE Category (
    c_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255)
);

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
    flag BOOLEAN NOT NULL DEFAULT false,
    PRIMARY KEY (v_id)
);


CREATE TABLE result (
 r_id INT PRIMARY KEY auto_increment,
  candidate_name VARCHAR(255),
  candidate_address VARCHAR(255),
  party_name VARCHAR(255),
  category_name VARCHAR(255),
  votes BIGINT
);

CREATE TABLE prevoter (
    v_id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    citizenshipid BIGINT NOT NULL,
    dob DATE NOT NULL,
    password VARCHAR(255) NOT NULL,
	frontImage VARCHAR(255) NOT NULL,
	backImage VARCHAR(255) NOT NULL,
	flag BOOLEAN NOT NULL DEFAULT false,
    PRIMARY KEY (v_id)
);

