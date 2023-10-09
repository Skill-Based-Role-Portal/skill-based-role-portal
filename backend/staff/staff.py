from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from os import environ

from datetime import datetime

app = Flask(__name__)
app.config["JSON_SORT_KEYS"] = False
app.config["SQLALCHEMY_DATABASE_URI"] = environ.get("dbURL")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_ENGINE_OPTIONS"] = {"pool_recycle": 299}

db = SQLAlchemy(app)

CORS(app)

bcrypt = Bcrypt(app)


class Staff(db.Model):
    __tablename__ = "staffs"

    staff_id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    department = db.Column(db.String(50), nullable=False)
    location = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(50), nullable=False)
    password = db.Column(db.String(60), nullable=False)

    # Add a foreign key relationship to the Access table
    access_rights_id = db.Column(db.Integer, db.ForeignKey("access.access_id"))

    # Define a relationship to Access
    access_rights = db.relationship(
        "Access", primaryjoin="Staff.access_rights_id == Access.access_id", backref="staff")

    staff_skills = db.relationship("Staff_Skill", primaryjoin="Staff.staff_id == foreign(Staff_Skill.staff_id)",
                                   foreign_keys="[Staff_Skill.staff_id]", backref="staff")

    is_active = db.Column(db.Boolean, default=False, nullable=False)
    created = db.Column(db.DateTime, nullable=False, default=datetime.now)

    def __init__(self, first_name, last_name, department, location, email, password, access_rights, is_active):
        self.first_name = first_name
        self.last_name = last_name
        self.department = department
        self.location = location
        self.email = email
        self.password = bcrypt.generate_password_hash(password).decode("utf8")

        # Check if the provided access_rights exists in the Access table
        access = Access.query.filter_by(access_id=access_rights).first()
        if access:
            self.access_rights = access
        else:
            raise ValueError("Invalid Access Rights")

        self.is_active = is_active

    def json(self):
        r = {
            "staff_id": self.staff_id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "department": self.department,
            "location": self.location,
            "email": self.email,
            "access_rights": self.access_rights.access_type,
            "is_active": self.is_active,
            "created": self.created
        }

        r["skills"] = []
        for skill in self.staff_skills:
            r["skills"].append(skill.json()["skill_name"])

        return r


class Access(db.Model):
    __tablename__ = "access"

    access_id = db.Column(db.Integer, primary_key=True)
    access_type = db.Column(db.String(50), nullable=False)

    def __init__(self, access_type):
        self.access_type = access_type

    def json(self):
        return {"access_id": self.access_id, "access_type": self.access_type}


class Staff_Skill(db.Model):
    __tablename__ = "staff_skills"

    staff_id = db.Column(db.String(20), primary_key=True)
    skill_name = db.Column(db.String(20), primary_key=True)

    def __init__(self, staff_id, skill_name):
        self.staff_id = staff_id
        self.skill_name = skill_name

    def json(self):
        return {"staff_id": self.staff_id, "skill_name": self.skill_name}


with app.app_context():
    db.create_all()

    # Populate Access Rights
    existing_access_1 = db.session.query(
        Access).filter(Access.access_id == 1).first()
    if not existing_access_1:
        new_access_1 = Access(access_type="Human Resource")
        new_access_2 = Access(access_type="Staff")
        new_access_3 = Access(access_type="Manager")

        db.session.add_all([new_access_1, new_access_2, new_access_3])

        db.session.commit()

    # Populate Staff
    existing_staff_1 = db.session.query(
        Staff).filter(Staff.staff_id == 1).first()
    if not existing_staff_1:
        new_staff_1 = Staff(first_name="Peter", last_name="Parker", department="Finance", location="Singapore",
                            email="peter.parker@aio.com", password="password", access_rights=1, is_active=1)
        new_staff_2 = Staff(first_name="Nick", last_name="Fury", department="Human Resources",
                            location="Singapore", email="nick.fury@aio.com", password="password", access_rights=2, is_active=1)
        new_staff_3 = Staff(first_name="Tony", last_name="Stark", department="Information Technology",
                            location="Singapore", email="tony.stark@aio.com", password="password", access_rights=3, is_active=1)

        db.session.add_all([new_staff_1, new_staff_2, new_staff_3])

        db.session.commit()


@app.route("/staff")
def get_all():
    stafflist = Staff.query.all()
    if len(stafflist):
        return jsonify(
            {
                "code": 200,
                "data": {
                    "staffs": [staff.json() for staff in stafflist]
                }
            }
        ), 200
    return jsonify(
        {
            "code": 404,
            "message": "There are no staffs."
        }
    ), 404


@app.route("/staff/<staff_id>")
def find_by_staff_id(staff_id):
    staff = Staff.query.filter_by(staff_id=staff_id).first()
    if staff:
        return jsonify(
            {
                "code": 200,
                "data": staff.json()
            }
        ), 200
    return jsonify(
        {
            "code": 404,
            "message": "Staff not found."
        }
    ), 404


@app.route("/staff/email/<email>")
def find_by_email(email):
    staff = Staff.query.filter_by(email=email).first()
    if staff:
        return jsonify(
            {
                "code": 200,
                "data": staff.json()
            }
        ), 200
    return jsonify(
        {
            "code": 404,
            "message": "Staff not found."
        }
    ), 404


@app.route("/staff/login", methods=["POST"])
def login():
    data = request.get_json()

    if data["email"]:
        email = data["email"]
    if data["password"]:
        password = data["password"]

    staff = Staff.query.filter_by(email=email).first()

    if staff:
        if bcrypt.check_password_hash(staff.password, password):
            return jsonify(
                {
                    "code": 200,
                    "message": "Login successful",
                    "data": staff.json()
                }
            ), 200
        else:
            return jsonify(
                {
                    "code": 401,
                    "message": "Invalid credentials"
                }
            ), 401

    return jsonify(
        {
            "code": 404,
            "message": "Staff not found."
        }
    ), 404


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)
