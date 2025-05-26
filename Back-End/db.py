# db.py
import mysql.connector

conn = mysql.connector.connect(
    host='localhost',
    user='root',
    database='car_rental'
)

cursor = conn.cursor(dictionary=True)
