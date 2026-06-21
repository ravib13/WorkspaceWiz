import os

# MongoDB Connection
# OPTION 1: Local MongoDB (Default)
MONGO_URI = "mongodb://127.0.0.1:27017/office_booking"

# OPTION 2: MongoDB Atlas (Cloud) - Uncomment and replace with your connection string
# MONGO_URI = "mongodb+srv://<username>:<password>@cluster0.mongodb.net/office_booking?retryWrites=true&w=majority"

# Secret key for sessions
SECRET_KEY = "supersecretkey"

# Email configuration (use Gmail App Password)
EMAIL_USER = "vidyashreetn05@gmail.com" # This is the email that will send the OTPs
EMAIL_PASS = "your_app_password_here" # IMPORTANT: Replace with your Google App Password
