import unittest
from datetime import datetime, timedelta
from application import app, db, Application


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


if __name__ == "__main__":
    unittest.main()
