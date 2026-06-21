from flask import Flask, request, jsonify, send_from_directory, session, redirect, url_for
from flask_pymongo import PyMongo
from flask_cors import CORS
from bson.objectid import ObjectId
from datetime import datetime
import logging
import os
from functools import wraps

from config import MONGO_URI, SECRET_KEY
from utils import generate_otp, send_email_otp, generate_qr


app = Flask(__name__)
app.config["MONGO_URI"] = MONGO_URI
app.config["SECRET_KEY"] = SECRET_KEY

# ---------------- SECURITY CONFIG ----------------
app.config["SESSION_COOKIE_SAMESITE"] = "Lax"
app.config["SESSION_COOKIE_SECURE"] = False  # True in production (HTTPS only)

mongo = PyMongo(app)
db = mongo.db
print("CONNECTED DB:", db.name)

CORS(app, supports_credentials=True, origins=[
    "http://localhost:3000",
    "http://localhost:5173",
    "http://127.0.0.1:5500",
    "http://localhost:5000"
])

# ---------------- SETUP ----------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
QR_CODES_DIR = os.path.join(BASE_DIR, "qr_codes")
os.makedirs(QR_CODES_DIR, exist_ok=True)

logging.basicConfig(filename="app.log", level=logging.INFO)

users = db.users
spaces = db.spaces
bookings = db.bookings
wishlists = db.wishlists

ADMIN_EMAILS = ["vidyashreetn05@gmail.com"]


# ---------------- UTIL ----------------
def serialize(cursor):
    return [{**doc, "_id": str(doc["_id"])} for doc in cursor]


def admin_required(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        if not session.get("is_admin"):
            return jsonify({"error": "Admin access required"}), 403
        return f(*args, **kwargs)
    return wrapper


# ---------------- USER OTP ----------------
@app.route("/send-otp", methods=["POST"])
def send_otp():
    email = request.json.get("email", "").strip().lower()

    if not email:
        return jsonify({"error": "Email required"}), 400

    otp = generate_otp()

    users.update_one(
        {"email": email},
        {"$set": {"otp": otp, "verified": False}},
        upsert=True
    )

    try:
        send_email_otp(email, otp)
        print("EMAIL SENT SUCCESSFULLY")
    except Exception as e:
        print("EMAIL FAILED:", e)
        return jsonify({
            "error": "Email sending failed",
            "details": str(e)
        }), 500

    return jsonify({"message": "OTP sent"})


@app.route("/verify-otp", methods=["POST"])
def verify_otp():
    email = request.json.get("email", "").strip().lower()
    otp = str(request.json.get("otp", "")).strip()

    user = users.find_one({"email": email, "otp": otp})

    if not user:
        return jsonify({"error": "Invalid OTP"}), 400

    if user.get("blocked"):
        return jsonify({"error": "User blocked"}), 403

    users.update_one({"email": email}, {"$set": {"verified": True}})

    session["email"] = email
    session["is_admin"] = email in ADMIN_EMAILS

    return jsonify({
        "message": "Verified",
        "isAdmin": session["is_admin"],
        "user": {"email": email}
    })


@app.route("/logout", methods=["POST"])
def logout():
    session.clear()
    return jsonify({"message": "Logged out"})


# ---------------- ADMIN OTP ----------------
@app.route("/api/admin/send-otp", methods=["POST"])
def admin_send_otp():
    email = request.json.get("email", "").strip().lower()

    if email not in ADMIN_EMAILS:
        return jsonify({"error": "Unauthorized"}), 403

    otp = generate_otp()

    users.update_one(
        {"email": email},
        {"$set": {"otp": otp, "verified": False}},
        upsert=True
    )

    try:
        send_email_otp(email, otp)
        print("ADMIN EMAIL SENT SUCCESSFULLY")
    except Exception as e:
        print("ADMIN EMAIL FAILED:", e)
        return jsonify({
            "error": "Admin email failed",
            "details": str(e)
        }), 500

    return jsonify({"message": "Admin OTP sent"})


@app.route("/api/admin/login", methods=["POST"])
def admin_login():
    email = request.json.get("email", "").strip().lower()
    otp = str(request.json.get("otp", "")).strip()

    if email not in ADMIN_EMAILS:
        return jsonify({"error": "Unauthorized"}), 403

    user = users.find_one({"email": email, "otp": otp})

    if not user:
        return jsonify({"error": "Invalid OTP"}), 401

    session["is_admin"] = True
    session["email"] = email

    return jsonify({"message": "Admin login success"})


# ---------------- ADMIN PANEL ----------------
@app.route("/admin")
@admin_required
def admin_panel():
    return send_from_directory(BASE_DIR, "admin.html")


# ---------------- SPACES ----------------
@app.route("/spaces", methods=["GET"])
def get_spaces():
    return jsonify(serialize(spaces.find()))


@app.route("/spaces/<space_id>")
def get_space(space_id):
    space = spaces.find_one({"_id": ObjectId(space_id)})
    if not space:
        return jsonify({"error": "Space not found"}), 404
    space["_id"] = str(space["_id"])
    return jsonify(space)


# ---------------- BOOKINGS ----------------
@app.route("/book", methods=["POST"])
def book_space():
    data = request.json

    booking = {
        "user_id": data["user_id"],
        "space_id": data["space_id"],
        "date": data["date"],
        "time_slot": data["time_slot"],
        "status": "booked",
        "created_at": datetime.now()
    }

    booking_id = bookings.insert_one(booking).inserted_id

    qr = generate_qr(str(booking_id), str(booking_id))
    bookings.update_one({"_id": booking_id}, {"$set": {"qr_code": qr}})

    return jsonify({
        "booking_id": str(booking_id),
        "qr": qr
    })


@app.route("/my-bookings/<user_id>")
def my_bookings(user_id):
    return jsonify(serialize(bookings.find({"user_id": user_id})))


@app.route("/cancel/<booking_id>", methods=["DELETE"])
def cancel_booking(booking_id):
    bookings.update_one(
        {"_id": ObjectId(booking_id)},
        {"$set": {"status": "cancelled"}}
    )
    return jsonify({"message": "Cancelled"})


# ---------------- WISHLIST ----------------
@app.route("/api/wishlist", methods=["POST"])
def add_wishlist():
    data = request.json

    wishlists.insert_one({
        "user_id": data["user_id"],
        "space_id": data["space_id"],
        "added_at": datetime.now()
    })

    return jsonify({"message": "Added"})


@app.route("/api/wishlist/<user_id>")
def get_wishlist(user_id):
    return jsonify(serialize(wishlists.find({"user_id": user_id})))


# ---------------- STATIC ----------------
@app.route("/")
def home():
    return send_from_directory(BASE_DIR, "index.html")

@app.route("/<path:path>")
def static_files(path):
    return send_from_directory(BASE_DIR, path)



if __name__ == "__main__":
    print("Server running at http://localhost:5000")
    app.run(debug=True, host="0.0.0.0", port=5000)
