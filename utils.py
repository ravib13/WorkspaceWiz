from dotenv import load_dotenv
load_dotenv()

import os
import random
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import qrcode

# ---------------- EMAIL CONFIG ----------------
MAIL_USER = os.getenv("EMAIL_ADDRESS")
MAIL_PASSWORD = os.getenv("EMAIL_PASSWORD")

SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587


# ---------------- OTP GENERATOR ----------------
def generate_otp():
    return str(random.randint(100000, 999999))


# ---------------- SEND EMAIL OTP ----------------
def send_email_otp(to_email, otp):
    if not MAIL_USER or not MAIL_PASSWORD:
        raise Exception("Email credentials not loaded from .env")

    subject = "Your OTP Verification Code"

    body = f"""
Your OTP code is: {otp}

This code will expire after use.
If you did not request this, ignore this email.
"""

    msg = MIMEMultipart()
    msg["From"] = MAIL_USER
    msg["To"] = to_email
    msg["Subject"] = subject

    msg.attach(MIMEText(body, "plain"))

    try:
        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        server.starttls()

        print("DEBUG EMAIL:", MAIL_USER)
        print("DEBUG PASS LOADED:", bool(MAIL_PASSWORD))

        server.login(MAIL_USER, MAIL_PASSWORD)
        server.send_message(msg)
        server.quit()

        print(f"EMAIL SENT TO {to_email}")

    except Exception as e:
        raise Exception(f"Email sending failed: {str(e)}")


# ---------------- QR GENERATOR ----------------
def generate_qr(data, filename):
    folder = "qr_codes"
    os.makedirs(folder, exist_ok=True)

    path = os.path.join(folder, f"{filename}.png")

    qr = qrcode.make(data)
    qr.save(path)

    return path