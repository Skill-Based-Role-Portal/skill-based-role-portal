import unittest

from skill import Skill


class TestSkill(unittest.TestCase):
    def test_to_json(self):
        s1 = Skill(
            skill_name="Account Management",
            description="Description",
        )
        self.assertEqual(
            s1.json(),
            {
                "skill_name": "Account Management",
                "description": "Description",
            },
        )


if __name__ == "__main__":
    unittest.main()
