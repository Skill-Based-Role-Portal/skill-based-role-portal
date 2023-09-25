from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from os import environ

from datetime import datetime

app = Flask(__name__)
app.config['JSON_SORT_KEYS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = environ.get('dbURL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {'pool_recycle': 299}

db = SQLAlchemy(app)

CORS(app)


class Role(db.Model):
    __tablename__ = 'roles'

    role_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), nullable=False, unique=True)
    experience = db.Column(db.String(50), nullable=False)
    location = db.Column(db.String(50), nullable=False)
    department = db.Column(db.String(50), nullable=False)
    employment_type = db.Column(db.String(50), nullable=False)
    requirement = db.Column(db.String(256), nullable=False)
    description = db.Column(db.String(256), nullable=False)
    hiring_manager = db.Column(db.String(256), nullable=False)
    deadline = db.Column(db.DateTime, nullable=False)
    created = db.Column(db.DateTime, nullable=False, default=datetime.now)
    modified = db.Column(db.DateTime, nullable=False,
                         default=datetime.now, onupdate=datetime.now)

    role_skills = db.relationship("Role_Skill", primaryjoin='Role.name == foreign(Role_Skill.role_name)', foreign_keys="[Role_Skill.role_name]", backref="role")

    def __init__(self, name, experience, location, department, employment_type, requirement, description, hiring_manager, deadline, skills):
        self.name = name
        self.experience = experience
        self.location = location
        self.department = department
        self.employment_type = employment_type
        self.requirement = requirement
        self.description = description
        self.hiring_manager = hiring_manager
        self.deadline = deadline

        for skill_name in skills:
            role_skill = Role_Skill(role_name=name, skill_name=skill_name)
            self.role_skills.append(role_skill)

    def json(self):
        r = {
            'role_id': self.role_id,
            'name': self.name,
            'experience': self.experience,
            'location': self.location,
            'department': self.department,
            'employment_type': self.employment_type,
            'requirement': self.requirement,
            'description': self.description,
            'hiring_manager': self.hiring_manager,
            'deadline': self.deadline,
            'created': self.created,
            'modified': self.modified
        }

        r['skills'] = []
        for skill in self.role_skills:
            r['skills'].append(skill.json()["skill_name"])

        return r


class Role_Skill(db.Model):
    __tablename__ = 'role_skills'

    role_name = db.Column(db.String(20), primary_key=True)
    skill_name = db.Column(db.String(20), primary_key=True)

    def __init__(self, role_name, skill_name):
        self.role_name = role_name
        self.skill_name = skill_name

    def json(self):
        return {'role_name': self.role_name, 'skill_name': self.skill_name}


with app.app_context():
    db.create_all()

    existing_role_1 = db.session.query(Role).filter(
        Role.name == "Software Engineer").first()
    if not existing_role_1:
        new_role_1 = Role(name="Software Engineer", experience="Entry Level", location="Singapore", department="Information Technology", employment_type="Full Time",
                          requirement="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo", description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Gravida quis blandit turpis cursus in hac.", hiring_manager="Tony Stark", deadline="2023-12-31", skills=["HTML", "CSS", "JavaScript"])
        new_role_2 = Role(name="Marketing Associate", experience="Entry Level", location="Singapore", department="Marketing", employment_type="Full Time",
                          requirement="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo", description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Gravida quis blandit turpis cursus in hac.", hiring_manager="Tony Stark", deadline="2023-12-31", skills=["Graphic Design"])
        new_role_3 = Role(name="Sales Associate", experience="Entry Level", location="Singapore", department="Sales", employment_type="Full Time",
                          requirement="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo", description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Gravida quis blandit turpis cursus in hac.", hiring_manager="Tony Stark", deadline="2023-12-31", skills=[])

        db.session.add_all([new_role_1, new_role_2, new_role_3])
        db.session.commit()


@app.route("/role")
def get_all():
    rolelist = Role.query.all()
    if len(rolelist):
        return jsonify(
            {
                "code": 200,
                "data": {
                    "roles": [role.json() for role in rolelist]
                }
            }
        ), 200
    return jsonify(
        {
            "code": 404,
            "message": "There are no roles."
        }
    ), 404


@app.route("/role/active")
def get_all_active():
    today = datetime.today()

    rolelist = Role.query.filter(Role.deadline > today).all()
    if len(rolelist):
        return jsonify(
            {
                "code": 200,
                "data": {
                    "roles": [role.json() for role in rolelist]
                }
            }
        ), 200
    return jsonify(
        {
            "code": 404,
            "message": "There are no active roles."
        }
    ), 404


@app.route("/role/<role_id>")
def find_by_role_id(role_id):
    role = Role.query.filter_by(role_id=role_id).first()
    if role:
        return jsonify(
            {
                "code": 200,
                "data": role.json()
            }
        ), 200
    return jsonify(
        {
            "code": 404,
            "message": "Role not found."
        }
    ), 404


@app.route("/role", methods=['POST'])
def create_role():
    data = request.get_json()
    role = Role(**data)

    if (Role.query.filter_by(name=role.name).first()):
        return jsonify(
            {
                "code": 400,
                "data": {
                    "name": role.name
                },
                "message": "Role already exists."
            }
        ), 400

    try:
        db.session.add(role)
        db.session.commit()
    except:
        return jsonify(
            {
                "code": 500,
                "message": "An error occurred creating the role."
            }
        ), 500

    return jsonify(
        {
            "code": 201,
            "data": role.json()
        }
    ), 201

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5003, debug=True)