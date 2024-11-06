-- Schema for hospital management system
CREATE TABLE hospitals (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    level VARCHAR(50) NOT NULL,
    rating DECIMAL(3, 2),
    phone VARCHAR(50),
    email VARCHAR(255),
    address TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE specialties (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE hospital_specialties (
    hospital_id INT,
    specialty_id INT,
    PRIMARY KEY (hospital_id, specialty_id),
    FOREIGN KEY (hospital_id) REFERENCES hospitals (id),
    FOREIGN KEY (specialty_id) REFERENCES specialties (id)
);

CREATE TABLE doctors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    hospital_id INT,
    specialty_id INT,
    license_number VARCHAR(100) NOT NULL,
    phone VARCHAR(50),
    password VARCHAR(255),
    email VARCHAR(255),
    status VARCHAR(50) NOT NULL DEFAULT 'active',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (hospital_id) REFERENCES hospitals (id),
    FOREIGN KEY (specialty_id) REFERENCES specialties (id)
);

CREATE TABLE reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    hospital_id INT,
    user_id INT NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (hospital_id) REFERENCES hospitals (id)
);

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fullname VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(50),
    password VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Indexes for better query performance
CREATE INDEX idx_hospitals_location ON hospitals (location);
CREATE INDEX idx_hospitals_rating ON hospitals (rating);
CREATE INDEX idx_doctors_hospital ON doctors (hospital_id);
CREATE INDEX idx_reviews_hospital ON reviews (hospital_id);
