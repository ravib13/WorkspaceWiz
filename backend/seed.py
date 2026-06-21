from app import mongo

db = mongo.db

print("Connected DB:", db.name)

spaces = db.spaces

spaces.delete_many({})

data = [
    {
        "name": "Open Desk A",
        "type": "Open Desk",
        "floor": 1,
        "capacity": 4,
        "price": 10,
        "images": ["https://images.unsplash.com/photo-1497366811353-6870744d04b2"]
    },
    {
        "name": "Meeting Room B",
        "type": "Meeting Room",
        "floor": 2,
        "capacity": 8,
        "price": 25,
        "images": ["https://images.unsplash.com/photo-1521737604893-d14cc237f11d"]
    }
]

spaces.insert_many(data)

print("Spaces added successfully")
