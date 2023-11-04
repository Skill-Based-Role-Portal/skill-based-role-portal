import unittest

from datetime import datetime
from role import Role, Role_Skill


class TestRole(unittest.TestCase):
    def test_to_json(self):
        deadline_date_str = "2023-12-31 00:00:00"

        r1 = Role(
            name="Account Manager",
            experience="Entry Level",
            location="Singapore",
            department="Finance",
            employment_type="Full Time",
            requirement="Requirement",
            description="Description",
            hiring_manager="John Doe",
            deadline=deadline_date_str,
            skills=["Account Management"],
        )

        expected_deadline_date = datetime.strptime(
            deadline_date_str, "%Y-%m-%d %H:%M:%S"
        )

        self.assertEqual(
            r1.json(),
            {
                "role_id": None,
                "name": "Account Manager",
                "experience": "Entry Level",
                "location": "Singapore",
                "department": "Finance",
                "employment_type": "Full Time",
                "requirement": "Requirement",
                "description": "Description",
                "hiring_manager": "John Doe",
                "deadline": expected_deadline_date,
                "status": "Active",
                "skills": ["Account Management"],
                "created": None,
                "modified": None,
            },
        )


class TestRole_Skill(unittest.TestCase):
    def test_to_json(self):
        rs1 = Role_Skill(role_name="Account Manager", skill_name="Account Management")

        self.assertEqual(
            rs1.json(),
            {
                "role_name": "Account Manager",
                "skill_name": "Account Management",
            },
        )


if __name__ == "__main__":
    unittest.main()
