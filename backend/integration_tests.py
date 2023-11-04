import unittest
from datetime import datetime, timedelta
from application import app, db, Application
from role import app, db, Role


class TestApplication(unittest.TestCase):
    def setUp(self):
        """
        Create a new database for the unit test to use
        """
        app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///test.db"
        app.config["TESTING"] = True
        self.app = app.test_client()
        with app.app_context():
            db.create_all()

    def tearDown(self):
        """
        Drop the database tables and also remove the session
        """
        with app.app_context():
            db.session.remove()
            db.drop_all()

    def test_get_all_applications(self):
        """
        Test GET /application endpoint
        """
        with app.app_context():
            application_data = {
                "staff_id": 1,
                "role_id": 1,
                "status": "Applied",
            }

            application = Application(**application_data)
            db.session.add(application)
            db.session.commit()

            response = self.app.get("/application")
            self.assertEqual(response.status_code, 200)

            data = response.get_json()["data"]

            self.assertEqual(len(data["applications"]), 1)
            self.assertEqual(
                data["applications"][0]["staff_id"], application_data["staff_id"]
            )
            self.assertEqual(
                data["applications"][0]["role_id"], application_data["role_id"]
            )
            self.assertEqual(
                data["applications"][0]["status"], application_data["status"]
            )

    def test_get_all_applications_by_staff_id(self):
        """
        Test GET /application/staff/{staff_id} endpoint
        """
        with app.app_context():
            application_data = {
                "staff_id": 1,
                "role_id": 1,
                "status": "Applied",
            }

            application = Application(**application_data)
            db.session.add(application)
            db.session.commit()

            response = self.app.get(f"/application/staff/{application.staff_id}")
            self.assertEqual(response.status_code, 200)

            data = response.get_json()["data"]

            self.assertEqual(len(data["applications"]), 1)
            self.assertEqual(
                data["applications"][0]["staff_id"], application_data["staff_id"]
            )
            self.assertEqual(
                data["applications"][0]["role_id"], application_data["role_id"]
            )
            self.assertEqual(
                data["applications"][0]["status"], application_data["status"]
            )

    def test_get_all_applications_by_role_id(self):
        """
        Test GET /application/role/{role_id} endpoint
        """
        with app.app_context():
            application_data = {
                "staff_id": 1,
                "role_id": 1,
                "status": "Applied",
            }

            application = Application(**application_data)
            db.session.add(application)
            db.session.commit()

            response = self.app.get(f"/application/role/{application.role_id}")
            self.assertEqual(response.status_code, 200)

            data = response.get_json()["data"]

            self.assertEqual(len(data["applications"]), 1)
            self.assertEqual(
                data["applications"][0]["staff_id"], application_data["staff_id"]
            )
            self.assertEqual(
                data["applications"][0]["role_id"], application_data["role_id"]
            )
            self.assertEqual(
                data["applications"][0]["status"], application_data["status"]
            )

    def test_get_all_roles(self):
        """
        Test GET /role endpoint
        """
        with app.app_context():
            role_data = {
                "name": "Account Manager",
                "experience": "Entry Level",
                "location": "Singapore",
                "department": "Finance",
                "employment_type": "Full Time",
                "requirement": "Requirements",
                "description": "Descriptions",
                "hiring_manager": "John Doe",
                "deadline": (datetime.now() + timedelta(days=30)).strftime(
                    "%Y-%m-%d %H:%M:%S"
                ),
                "skills": ["Python", "JavaScript", "SQL"],
            }

            role = Role(**role_data)
            db.session.add(role)
            db.session.commit()

            response = self.app.get("/role")
            self.assertEqual(response.status_code, 200)

            data = response.get_json()["data"]

            self.assertEqual(len(data["roles"]), 1)
            self.assertEqual(data["roles"][0]["name"], role_data["name"])
            self.assertEqual(data["roles"][0]["experience"], role_data["experience"])
            self.assertEqual(data["roles"][0]["location"], role_data["location"])
            self.assertEqual(data["roles"][0]["department"], role_data["department"])
            self.assertEqual(
                data["roles"][0]["employment_type"], role_data["employment_type"]
            )
            self.assertEqual(data["roles"][0]["requirement"], role_data["requirement"])
            self.assertEqual(data["roles"][0]["description"], role_data["description"])
            self.assertEqual(
                data["roles"][0]["hiring_manager"], role_data["hiring_manager"]
            )
            self.assertEqual(
                datetime.strptime(
                    data["roles"][0]["deadline"], "%a, %d %b %Y %H:%M:%S GMT"
                ).strftime("%Y-%m-%d %H:%M:%S"),
                role_data["deadline"],
            )
            self.assertEqual(len(data["roles"][0]["skills"]), len(role_data["skills"]))

    def test_get_all_active_roles(self):
        """
        Test GET /role/active endpoint
        """
        with app.app_context():
            role_data = {
                "name": "Account Manager",
                "experience": "Entry Level",
                "location": "Singapore",
                "department": "Finance",
                "employment_type": "Full Time",
                "requirement": "Requirements",
                "description": "Descriptions",
                "hiring_manager": "John Doe",
                "deadline": (datetime.now() + timedelta(days=30)).strftime(
                    "%Y-%m-%d %H:%M:%S"
                ),
                "skills": ["Python", "JavaScript", "SQL"],
            }

            role = Role(**role_data)
            db.session.add(role)
            db.session.commit()

            response = self.app.get("/role/active")
            self.assertEqual(response.status_code, 200)

            data = response.get_json()["data"]

            current_datetime = datetime.now()

            self.assertEqual(len(data["roles"]), 1)
            self.assertEqual(data["roles"][0]["name"], role_data["name"])
            self.assertEqual(data["roles"][0]["experience"], role_data["experience"])
            self.assertEqual(data["roles"][0]["location"], role_data["location"])
            self.assertEqual(data["roles"][0]["department"], role_data["department"])
            self.assertEqual(
                data["roles"][0]["employment_type"], role_data["employment_type"]
            )
            self.assertEqual(data["roles"][0]["requirement"], role_data["requirement"])
            self.assertEqual(data["roles"][0]["description"], role_data["description"])
            self.assertEqual(
                data["roles"][0]["hiring_manager"], role_data["hiring_manager"]
            )
            self.assertTrue(
                datetime.strptime(
                    data["roles"][0]["deadline"], "%a, %d %b %Y %H:%M:%S GMT"
                )
                > current_datetime
            )
            self.assertEqual(len(data["roles"][0]["skills"]), len(role_data["skills"]))

    def test_find_role_by_id(self):
        """
        Test GET /role/{role_id} endpoint
        """
        with app.app_context():
            role_data = {
                "name": "Account Manager",
                "experience": "Entry Level",
                "location": "Singapore",
                "department": "Finance",
                "employment_type": "Full Time",
                "requirement": "Requirements",
                "description": "Descriptions",
                "hiring_manager": "John Doe",
                "deadline": (datetime.now() + timedelta(days=30)).strftime(
                    "%Y-%m-%d %H:%M:%S"
                ),
                "skills": ["Python", "JavaScript", "SQL"],
            }

            role = Role(**role_data)
            db.session.add(role)
            db.session.commit()

            response = self.app.get(f"/role/{role.role_id}")
            self.assertEqual(response.status_code, 200)

            role = Role.query.filter_by(role_id=role.role_id).first()
            self.assertIsNotNone(role)
            self.assertEqual(role.name, role_data["name"])
            self.assertEqual(role.experience, role_data["experience"])
            self.assertEqual(role.location, role_data["location"])
            self.assertEqual(role.department, role_data["department"])
            self.assertEqual(role.employment_type, role_data["employment_type"])
            self.assertEqual(role.requirement, role_data["requirement"])
            self.assertEqual(role.description, role_data["description"])
            self.assertEqual(role.hiring_manager, role_data["hiring_manager"])
            self.assertEqual(
                role.deadline.strftime("%Y-%m-%d %H:%M:%S"), role_data["deadline"]
            )
            self.assertEqual(len(role.role_skills), len(role_data["skills"]))

    def test_create_role(self):
        """
        Test POST /role endpoint
        """
        with app.app_context():
            role_data = {
                "name": "Account Manager",
                "experience": "Entry Level",
                "location": "Singapore",
                "department": "Finance",
                "employment_type": "Full Time",
                "requirement": "Requirements",
                "description": "Descriptions",
                "hiring_manager": "John Doe",
                "deadline": (datetime.now() + timedelta(days=30)).strftime(
                    "%Y-%m-%d %H:%M:%S"
                ),
                "skills": ["Python", "JavaScript", "SQL"],
            }

            response = self.app.post("/role", json=role_data)
            self.assertEqual(response.status_code, 201)

            role = Role.query.filter_by(name=role_data["name"]).first()
            self.assertIsNotNone(role)
            self.assertEqual(role.name, role_data["name"])
            self.assertEqual(role.experience, role_data["experience"])
            self.assertEqual(role.location, role_data["location"])
            self.assertEqual(role.department, role_data["department"])
            self.assertEqual(role.employment_type, role_data["employment_type"])
            self.assertEqual(role.requirement, role_data["requirement"])
            self.assertEqual(role.description, role_data["description"])
            self.assertEqual(role.hiring_manager, role_data["hiring_manager"])
            self.assertEqual(
                role.deadline.strftime("%Y-%m-%d %H:%M:%S"), role_data["deadline"]
            )
            self.assertEqual(len(role.role_skills), len(role_data["skills"]))

    def test_update_role(self):
        """
        Test PUT /role/{role_id} endpoint
        """
        with app.app_context():
            role_data = {
                "name": "Account Manager",
                "experience": "Entry Level",
                "location": "Singapore",
                "department": "Finance",
                "employment_type": "Full Time",
                "requirement": "Requirements",
                "description": "Descriptions",
                "hiring_manager": "John Doe",
                "deadline": (datetime.now() + timedelta(days=30)).strftime(
                    "%Y-%m-%d %H:%M:%S"
                ),
                "skills": ["Python", "JavaScript", "SQL"],
            }

            role = Role(**role_data)
            db.session.add(role)
            db.session.commit()

            updated_role_data = {
                "name": "Updated Account Manager",
                "experience": "Updated Entry Level",
                "location": "Updated Singapore",
                "department": "Updated Finance",
                "employment_type": "Updated Full Time",
                "requirement": "Updated Requirements",
                "description": "Updated Descriptions",
                "hiring_manager": "John Doe",
                "deadline": (datetime.now() + timedelta(days=30)).strftime(
                    "%Y-%m-%d %H:%M:%S"
                ),
                "skills": ["Python", "JavaScript", "SQL", "Excel"],
            }

            response = self.app.put(f"/role/{role.role_id}", json=updated_role_data)
            self.assertEqual(response.status_code, 200)

            role = Role.query.filter_by(name=updated_role_data["name"]).first()
            self.assertIsNotNone(role)
            self.assertEqual(role.name, updated_role_data["name"])
            self.assertEqual(role.experience, updated_role_data["experience"])
            self.assertEqual(role.location, updated_role_data["location"])
            self.assertEqual(role.department, updated_role_data["department"])
            self.assertEqual(role.employment_type, updated_role_data["employment_type"])
            self.assertEqual(role.requirement, updated_role_data["requirement"])
            self.assertEqual(role.description, updated_role_data["description"])
            self.assertEqual(role.hiring_manager, updated_role_data["hiring_manager"])
            self.assertEqual(
                role.deadline.strftime("%Y-%m-%d %H:%M:%S"),
                updated_role_data["deadline"],
            )
            self.assertEqual(len(role.role_skills), len(updated_role_data["skills"]))


if __name__ == "__main__":
    unittest.main()
