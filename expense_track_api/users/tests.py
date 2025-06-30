from django.test import TestCase

from users.models import User


class PostModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            email="test@mail.com",
            password="testpassword",
            first_name="Test",
            last_name="User",
        )
    
    def test_user_creation(self):
        user = User.objects.get(email="test@mail.com")
        self.assertIsNotNone(user)
        self.assertEqual(user.email, "test@mail.com")
        self.assertTrue(user.check_password("testpassword"))
    
