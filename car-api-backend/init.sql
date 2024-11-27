-- Create a database and tables for the car application
CREATE DATABASE IF NOT EXISTS car_database;
USE car_database;

-- Create a users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    refresh_token VARCHAR(255)
);

-- Create a cars table
CREATE TABLE IF NOT EXISTS cars (
    id INT AUTO_INCREMENT PRIMARY KEY,
    maker VARCHAR(50) NOT NULL,
    model VARCHAR(50) NOT NULL,
    year INT(4) NOT NULL,
    price DECIMAL(10,2),
    description TEXT
);

-- Insert some data into the car table
INSERT INTO cars (maker, model, year, price, description) VALUES
('Audi', 'A5', 2010, 20000.00, '8T MY10 Sportback 5dr S tronic 7sp quattro 2.0T'),
('Audi', 'A5', 2015, 25000.00, '8T MY15 Coupe 2dr S tronic 7sp quattro 2.0TFSI'),
('Audi', 'A5', 2020, 40000.00, 'F5 MY20 Sportback 5dr S tronic 7sp quattro ultra 2.0TFSI'),
('Audi', 'A4', 2018, 30000.00, 'B9 MY18 Sedan 4dr S tronic 7sp quattro 2.0TFSI'),
('Audi', 'A4', 2021, 38000.00, 'B9 MY21 Sedan 4dr S tronic 7sp quattro 2.0TFSI'),
('BMW', 'X5', 2016, 45000.00, 'F15 MY16 xDrive30d Wagon 5dr Steptronic 8sp 4x4 3.0DT'),
('BMW', 'X5', 2020, 75000.00, 'G05 MY20 xDrive30d M Sport Wagon 5dr Steptronic 8sp 4x4 3.0DT'),
('BMW', 'X3', 2019, 50000.00, 'G01 MY19 xDrive30i Wagon 5dr Steptronic 8sp 4x4 2.0T'),
('Mercedes', 'C200', 2018, 35000.00, 'W205 MY18 Sedan 4dr 9G-TRONIC 9sp 2.0T'),
('Mercedes', 'C200', 2021, 50000.00, 'W206 MY21 Sedan 4dr 9G-TRONIC 9sp 2.0T'),
('Mercedes', 'GLA200', 2017, 30000.00, 'X156 MY17 Wagon 5dr DCT 7sp 1.6T'),
('Mercedes', 'GLA200', 2020, 45000.00, 'H247 MY20 Wagon 5dr DCT 7sp 1.3T'),
('Tesla', 'Model 3', 2020, 60000.00, 'Model 3 MY20 Sedan 4dr Single Speed 1sp RWD 225kW'),
('Tesla', 'Model 3', 2021, 62000.00, 'Model 3 MY21 Sedan 4dr Single Speed 1sp AWD 250kW'),
('Tesla', 'Model S', 2019, 90000.00, 'Model S MY19 Sedan 4dr Reduction Gear 1sp AWD 310kW'),
('Toyota', 'Corolla', 2018, 18000.00, 'ZRE172R MY18 Sedan 4dr CVT 7sp 1.8i'),
('Toyota', 'Corolla', 2021, 25000.00, 'ZWE211R MY21 Hybrid Hatchback 5dr E-CVT 1sp 1.8i/53kW Hybrid'),
('Toyota', 'Camry', 2020, 30000.00, 'GSV70R MY20 Ascent Sedan 4dr Auto 6sp 3.5i'),
('Toyota', 'Camry', 2022, 35000.00, 'AXVH70R MY22 Hybrid Ascent Sport Sedan 4dr E-CVT 1sp 2.5i/88kW Hybrid'),
('Ford', 'Mustang', 2017, 40000.00, 'FM MY17 Fastback 2dr SelectShift 6sp 5.0i'),
('Ford', 'Mustang', 2020, 50000.00, 'FN MY20 Fastback GT 2dr SelectShift 10sp 5.0i'),
('Ford', 'Ranger', 2018, 35000.00, 'PX MKII MY18 XLT Pick-up Double Cab 4dr Spts Auto 6sp 4x4 3.2DT'),
('Ford', 'Ranger', 2021, 45000.00, 'PX MKIII MY21 Wildtrak Pick-up Double Cab 4dr Spts Auto 10sp 4x4 2.0DT'),
('Honda', 'Civic', 2018, 22000.00, 'FC MY18 Sedan 4dr CVT 1.5T'),
('Honda', 'Civic', 2020, 25000.00, 'FK MY20 Type R Hatchback 5dr Man 6sp 2.0T'),
('Honda', 'Accord', 2019, 30000.00, '10th Gen MY19 VTi-LX Sedan 4dr CVT 1.5T'),
('Honda', 'Accord', 2021, 35000.00, '10th Gen MY21 VTi-LX Sedan 4dr CVT 1.5T');



