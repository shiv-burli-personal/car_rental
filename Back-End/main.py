from fastapi import FastAPI, Request
from db import cursor, conn
from fastapi.middleware.cors import CORSMiddleware
from models import CustomerCreate, RentalCreate, PaymentCreate


app = FastAPI()

# Enable CORS (so frontend can call backend from browser)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, use only your domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------------
# API ROUTES
# -----------------------------------

# Get list of all available cars
@app.get("/cars")
def get_cars():
    cursor.execute("SELECT * FROM Car WHERE status = 'available'")
    return cursor.fetchall()

# Register a new customer
@app.post("/customers")
async def register_customer(data : CustomerCreate):
 
    cursor.execute("""
        INSERT INTO Customer (customer_id, name, email, password, phone, address, driving_license_number, gender)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
    """,
    (
        data.customer_id,
        data.name,
        data.email,
        data.password,
        data.phone,
        data.address,
        data.driving_license_number,
        data.gender))
    conn.commit()
    return {"message": "Customer registered successfully"}

# Book a rental
@app.post("/rentals")
async def create_rental(data : RentalCreate):

    cursor.execute("""
        INSERT INTO Rental (rental_id, customer_id, car_id, rental_date, return_date, rental_status, rent_period)
        VALUES (%s, %s, %s, %s, %s, %s, %s)
    """,
    (
        data.rental_id,
        data.customer_id,
        data.car_id,
        data.rental_date,
        data.return_date,
    ))

    conn.commit()

    # Optionally update car status to "booked"
    cursor.execute("UPDATE Car SET status = 'booked' WHERE car_id = %s", (data["car_id"],))
    conn.commit()

    return {"message": "Rental booked successfully"}

# Make a payment
@app.post("/payments")
async def make_payment(data : PaymentCreate):
    
    cursor.execute( """
        INSERT INTO Payment (payment_id, rental_id, customer_id, payment_method, payment_amount)
        VALUES (%s, %s, %s, %s, %s)
    """,
    (data.payment_id,
    data.rental_id,
    data.customer_id,
    data.payment_method,
    data.payment_amount)
    )
    conn.commit()
    return {"message": "Payment recorded successfully"}

# View maintenance logs
@app.get("/maintenance")
def view_maintenance():
    cursor.execute("SELECT * FROM Maintenance")
    return cursor.fetchall()
