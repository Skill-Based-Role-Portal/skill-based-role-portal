CREATE DATABASE IF NOT EXISTS `staff` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `staff`;

CREATE TABLE IF NOT EXISTS access (
    access_id INT AUTO_INCREMENT PRIMARY KEY,
    access_type VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS staffs (
    staff_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    department VARCHAR(50) NOT NULL,
    location VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(60) NOT NULL DEFAULT 'password',
    access_rights_id INT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created DATETIME NOT NULL,
    FOREIGN KEY (access_rights_id) REFERENCES access (access_id)
);

CREATE TABLE IF NOT EXISTS staff_skills (
    staff_id VARCHAR(50),
    skill_name VARCHAR(50),
    PRIMARY KEY (staff_id, skill_name),
    FOREIGN KEY (staff_id) REFERENCES staffs (staff_id)
);

LOAD DATA INFILE '/data/Access_Control.csv'
INTO TABLE access
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\r\n'
IGNORE 1 LINES
(access_id, access_type);

LOAD DATA INFILE '/data/staff.csv'
INTO TABLE staffs
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\r\n'
IGNORE 1 LINES
(staff_id, first_name, last_name, department, location, email, password, access_rights_id, is_active, created);

LOAD DATA INFILE '/data/staff_skill.csv'
INTO TABLE staff_skills
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\r\n'
IGNORE 1 LINES
(staff_id, skill_name);










CREATE DATABASE IF NOT EXISTS `role` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `role`;

CREATE TABLE IF NOT EXISTS roles (
    role_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    experience VARCHAR(50) NOT NULL,
    location VARCHAR(50) NOT NULL,
    department VARCHAR(50) NOT NULL,
    employment_type VARCHAR(50) NOT NULL,
    requirement VARCHAR(256) NOT NULL,
    description VARCHAR(10000) NOT NULL,
    hiring_manager VARCHAR(256) NOT NULL,
    deadline DATETIME NOT NULL,
    created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    modified DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS role_skills (
    role_name VARCHAR(50),
    skill_name VARCHAR(50),
    PRIMARY KEY (role_name, skill_name)
);

LOAD DATA INFILE '/data/role.csv'
INTO TABLE roles
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\r\n'
IGNORE 1 LINES
(role_id, name, experience, location, department, employment_type, requirement, description, hiring_manager, deadline, created, modified);

LOAD DATA INFILE '/data/role_skill.csv'
INTO TABLE role_skills
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\r\n'
IGNORE 1 LINES
(role_name, skill_name);










CREATE DATABASE IF NOT EXISTS `application` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `application`;