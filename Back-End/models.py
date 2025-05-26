from pydantic import BaseModel
from typing import Optional
from datetime import date

class CustomerCreate(BaseModel):
    customer_id: str
    name: str
    email: str
    password: str
    phone: str
    address: str
    driving_license_number: str
    gender: str

class RentalCreate(BaseModel):
    rental_id: str
    customer_id: str
    car_id: str
    rental_date: date
    return_date: date
    rental_status: str
    rent_period: int

class PaymentCreate(BaseModel):
    payment_id: str
    rental_id: str
    customer_id: str
    payment_method: str
    payment_amount: float

class CarCreate(BaseModel):
    car_id: str
    license_plate: str
    model: str  
    year: int
    daily_rental_price: int
    status: str

class MaintenanceCreate(BaseModel):
    maintenance_id: str
    car_id: str
    maintenance_date: date
    service_type: str
    service_cost: int
    