import unittest
from skill import app, db, Skill


class TestSkill(unittest.TestCase):
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

    def test_get_all_skills(self):
        """
        Test GET /skill endpoint
        """
        with app.app_context():
            # Add some skills to the database
            skill1 = Skill(
                "Account Management",
                "Description",
            )
            skill2 = Skill(
                "Technology Application",
                "Description",
            )
            db.session.add_all([skill1, skill2])
            db.session.commit()

            # Make a GET request to /skill endpoint
            response = self.app.get("/skill")

            # Check if the response status code is 200
            self.assertEqual(response.status_code, 200)

            # Check if the response data contains the correct skills
            expected_data = {
                "code": 200,
                "data": {
                    "skills": [
                        {
                            "skill_name": "Account Management",
                            "description": "Description",
                        },
                        {
                            "skill_name": "Technology Application",
                            "description": "Description",
                        },
                    ]
                },
            }
            self.assertEqual(response.json, expected_data)

    def test_get_all_skill_names(self):
        """
        Test GET /skill/names endpoint
        """
        with app.app_context():
            # Add some skills to the database
            skill1 = Skill(
                "Account Management",
                "Description",
            )
            skill2 = Skill(
                "Technology Application",
                "Description",
            )
            db.session.add_all([skill1, skill2])
            db.session.commit()

            # Make a GET request to /skill/names endpoint
            response = self.app.get("/skill/names")

            # Check if the response status code is 200
            self.assertEqual(response.status_code, 200)

            # Check if the response data contains the correct skill names
            expected_data = {
                "code": 200,
                "data": {
                    "skill_names": ["Account Management", "Technology Application"]
                },
            }
            self.assertEqual(response.json, expected_data)


if __name__ == "__main__":
    unittest.main()
