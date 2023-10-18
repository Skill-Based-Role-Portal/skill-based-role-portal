from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from os import environ

from datetime import datetime

app = Flask(__name__)
app.config["JSON_SORT_KEYS"] = False
app.config["SQLALCHEMY_DATABASE_URI"] = environ.get("dbURL")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_ENGINE_OPTIONS"] = {"pool_recycle": 299}

db = SQLAlchemy(app)

CORS(app)


class Staff(db.Model):
    __tablename__ = "staffs"

    staff_id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    department = db.Column(db.String(50), nullable=False)
    location = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(50), nullable=False)
    password = db.Column(db.String(60), nullable=False, default="password")

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
        self.password = password

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

    staff_id = db.Column(db.String(50), primary_key=True)
    skill_name = db.Column(db.String(50), primary_key=True)

    def __init__(self, staff_id, skill_name):
        self.staff_id = staff_id
        self.skill_name = skill_name

    def json(self):
        return {"staff_id": self.staff_id, "skill_name": self.skill_name}




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


@app.route("/staff/managers")
def get_all_manager():
    stafflist = Staff.query.filter_by(access_rights_id=3).all()

    if len(stafflist):
        return jsonify(
            {
                "code": 200,
                "data": {
                    "staffs": [f"{staff.first_name} {staff.last_name}" for staff in stafflist]
                }
            }
        ), 200
    return jsonify(
        {
            "code": 404,
            "message": "There are no managers."
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
        if staff.password == password:
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
