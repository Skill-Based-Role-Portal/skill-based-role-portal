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
    staff_id INT,
    skill_name VARCHAR(50),
    PRIMARY KEY (staff_id, skill_name),
    FOREIGN KEY (staff_id) REFERENCES staffs (staff_id)
);










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










CREATE DATABASE IF NOT EXISTS `application` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `application`;

CREATE TABLE IF NOT EXISTS applications (
    application_id INT AUTO_INCREMENT PRIMARY KEY,
    staff_id INT NOT NULL,
    role_id INT NOT NULL,
    status VARCHAR(50) NOT NULL,
    created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    modified DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);










CREATE DATABASE IF NOT EXISTS `skill` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `skill`;

CREATE TABLE IF NOT EXISTS skills (
    skill_name VARCHAR(50),
    description VARCHAR(256),
    PRIMARY KEY (skill_name)
);
