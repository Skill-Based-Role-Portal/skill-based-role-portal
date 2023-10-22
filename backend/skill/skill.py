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


class Skill(db.Model):
    __tablename__ = "skills"

    skill_name = db.Column(db.String(50), primary_key=True)
    description = db.Column(db.String(256))

    def __init__(self, skill_name, description):
        self.skill_name = skill_name
        self.description = description

    def json(self):
        return {"skill_name": self.skill_name, "description": self.description}


@app.route("/skill")
def get_all():
    skillList = Skill.query.all()
    if len(skillList):
        return jsonify(
            {
                "code": 200,
                "data": {
                    "skills": [skill.json() for skill in skillList]
                }
            }
        ), 200
    return jsonify(
        {
            "code": 404,
            "message": "There are no skills."
        }
    ), 404


@app.route("/skill/names")
def get_all_skill_names():
    skillList = Skill.query.all()
    if len(skillList):
        return jsonify(
            {
                "code": 200,
                "data": {
                    "skill_names": [skill.skill_name for skill in skillList]
                }
            }
        ), 200
    return jsonify(
        {
            "code": 404,
            "message": "There are no skills."
        }
    ), 404


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5004, debug=True)
