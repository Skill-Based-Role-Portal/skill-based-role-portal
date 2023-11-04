import unittest

from datetime import datetime
from application import Application


class TestApplication(unittest.TestCase):
    def test_to_json(self):
        a1 = Application(staff_id=1, role_id=1, status="Applied")

        self.assertEqual(a1.json(), {
            "application_id": None,
            "staff_id": 1,
            "role_id": 1,
            "status": "Applied",
            "created": None,
            "modified": None,
          }
        )

if __name__ == "__main__":
    unittest.main()