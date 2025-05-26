create table if not exists Car (
    car_id varchar(255) PRIMARY KEY,
    license_plate varchar(255) not null,
    model varchar(255) not null,
    year int not null,
    daily_rental_price int not null,
    status varchar(255) not null
);


create table if not exists Customer (
    customer_id varchar(255) primary key,
    name varchar(255) not null,
    email varchar(255) not null,
    password varchar(255) not null,
    phone varchar(255) not null,
    address varchar(255) not null,
    driving_license_number varchar(255) not null,
    gender varchar(255) not null
);


create table if not exists Rental (
    rental_id varchar(255) PRIMARY KEY,
    customer_id varchar(255) NOT NULL,
    car_id varchar(255) NOT NULL,
    rental_date date not null,
    return_date date not null,
    rental_status varchar(255) not null,
    rent_period int not null,
    FOREIGN KEY (customer_id) REFERENCES Customer(customer_id),
    FOREIGN KEY (car_id) REFERENCES Car(car_id)
);


create table if not exists Payment (
    payment_id varchar(255) PRIMARY KEY,
    rental_id varchar(255) NOT NULL,
    customer_id varchar(255) NOT NULL,
    payment_method VARCHAR(50),
    payment_amount DECIMAL(10, 2),
    FOREIGN KEY (rental_id) REFERENCES Rental(rental_id),
    FOREIGN KEY (customer_id) REFERENCES Customer(customer_id)
);


create table if not exists Maintenance (
    maintenance_id varchar(255) PRIMARY KEY,
    car_id varchar(255) NOT NULL,
    maintenance_date date not null,
    service_type varchar(255) not null,
    service_cost int not null,
    FOREIGN KEY (car_id) REFERENCES Car(car_id)
);


