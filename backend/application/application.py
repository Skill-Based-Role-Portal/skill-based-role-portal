from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from os import environ

from datetime import datetime

from invokes import invoke_http

app = Flask(__name__)
app.json.sort_keys = False
app.config["SQLALCHEMY_DATABASE_URI"] = environ.get("dbURL")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_ENGINE_OPTIONS"] = {"pool_recycle": 299}

db = SQLAlchemy(app)

CORS(app)

staff_URL = environ.get("staffURL") or "http://localhost:5001/staff/"
role_URL = environ.get("roleURL") or "http://localhost:5003/role/"


class Application(db.Model):
    __tablename__ = "applications"

    application_id = db.Column(db.Integer, primary_key=True)
    staff_id = db.Column(db.Integer, nullable=False)
    role_id = db.Column(db.Integer, nullable=False)
    status = db.Column(db.String(50), nullable=False)
    created = db.Column(db.DateTime, nullable=False, default=datetime.now)
    modified = db.Column(
        db.DateTime, nullable=False, default=datetime.now, onupdate=datetime.now
    )

    def __init__(self, staff_id, role_id, status):
        self.staff_id = staff_id
        self.role_id = role_id
        self.status = status

    def json(self):
        return {
            "application_id": self.application_id,
            "staff_id": self.staff_id,
            "role_id": self.role_id,
            "status": self.status,
            "created": self.created,
            "modified": self.modified,
        }


@app.route("/application")
def get_all():
    application_list = Application.query.all()
    if len(application_list):
        return (
            jsonify(
                {
                    "code": 200,
                    "data": {
                        "applications": [
                            application.json() for application in application_list
                        ]
                    },
                }
            ),
            200,
        )
    return jsonify({"code": 404, "message": "There are no applications."}), 404


@app.route("/application/staff/<staff_id>")
def get_all_applications_by_staff_id(staff_id):
    applications_list = Application.query.filter_by(staff_id=staff_id).all()
    if len(applications_list):
        return (
            jsonify(
                {
                    "code": 200,
                    "data": {
                        "applications": [
                            application.json() for application in applications_list
                        ],
                    },
                }
            ),
            200,
        )
    return (
        jsonify(
            {
                "code": 404,
                "message": "There are no applications from staff " + staff_id + " .",
            }
        ),
        404,
    )


@app.route("/application/role/<role_id>")
def get_all_applications_by_role_id(role_id):
    applications_list = Application.query.filter_by(role_id=role_id).all()
    if len(applications_list):
        return (
            jsonify(
                {
                    "code": 200,
                    "data": {
                        "applications": [
                            application.json() for application in applications_list
                        ],
                    },
                }
            ),
            200,
        )
    return (
        jsonify(
            {
                "code": 404,
                "message": "There are no applications for role " + role_id + " .",
            }
        ),
        404,
    )


@app.route("/application/applicants/<role_id>")
def get_all_applicants_by_role_id(role_id):
    applications_list = Application.query.filter_by(role_id=role_id).all()
    if len(applications_list):
        applicants_list = []

        for application in applications_list:
            staff_result = invoke_http(
                staff_URL + str(application.staff_id), method="GET"
            )

            if staff_result["code"] == 200:
                applicants_list.append(staff_result["data"])

        return (
            jsonify(
                {
                    "code": 200,
                    "data": {
                        "applicants": applicants_list,
                    },
                }
            ),
            200,
        )
    return (
        jsonify(
            {
                "code": 404,
                "message": "There are no applicants for role " + role_id + " .",
            }
        ),
        404,
    )


@app.route("/application", methods=["POST"])
def create_application():
    data = request.get_json()
    application = Application(**data)

    staff_result = invoke_http(staff_URL + str(application.staff_id), method="GET")

    if staff_result["code"] in range(500, 600):
        return jsonify({"code": 500, "message": "Oops, something went wrong!"}), 500

    if staff_result["code"] in range(300, 500):
        return (
            jsonify(
                {
                    "code": 400,
                    "data": {"staff_id": application.staff_id},
                    "message": "Staff does not exist.",
                }
            ),
            400,
        )

    role_result = invoke_http(role_URL + str(application.role_id), method="GET")

    if role_result["code"] in range(500, 600):
        return jsonify({"code": 500, "message": "Oops, something went wrong!"}), 500

    if role_result["code"] in range(300, 500):
        return (
            jsonify(
                {
                    "code": 400,
                    "data": {"role_id": application.role_id},
                    "message": "Role does not exist.",
                }
            ),
            400,
        )

    existing_application = Application.query.filter_by(
        staff_id=application.staff_id, role_id=application.role_id
    ).first()

    if existing_application:
        return (
            jsonify(
                {
                    "code": 400,
                    "data": {"application_id": existing_application.application_id},
                    "message": "Role Application already exists.",
                }
            ),
            400,
        )

    try:
        db.session.add(application)
        db.session.commit()
    except:
        return (
            jsonify(
                {"code": 500, "message": "An error occurred creating the application."}
            ),
            500,
        )

    return jsonify({"code": 201, "data": application.json()}), 201


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5002, debug=True)
