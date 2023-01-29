import json
from django.test import TestCase
from users.models import User
from django.core import serializers
from recipedia import *

class TestUsers(TestCase):
    def setUp(self):
        test_user1 = User.objects.create_user(
            username='testuser1', 
            password='1X<ISRUkw+tuK',
            first_name="test",
            last_name="test",
            email="test@test.com",
            profile_picture=None)
        test_user1.save()

    def __get_user_token(self):
        login_response = self.client.post("/user/login/", 
        json.dumps({'username':'testuser1', 'password':'1X<ISRUkw+tuK'}),
        content_type='application/json')
        return login_response.json()["token"]

    def test_login_should_succeed(self):
        login_response = self.client.post("/user/login/", 
            json.dumps({'username':'testuser1', 'password':'1X<ISRUkw+tuK'}),
            content_type='application/json')
        data = login_response.json()
        
        self.assertEqual(data["status"], "success")
        self.assertIsNotNone(data["token"])

    def test_login_should_fail(self):
        login_response = self.client.post("/user/login/", 
            json.dumps({'username':'test', 'password':'test'}),
            content_type='application/json')
        data = login_response.json()
        
        self.assertEqual(data["status"], "failed")
        self.assertEqual(data["message"], "Invalid credentials")

    def test_logged_user_should_not_log_in_again(self):
        login = self.client.login(username="testuser1", password="1X<ISRUkw+tuK")
        self.assertTrue(login)

        response = self.client.post("/user/login/", 
            json.dumps({'username':'test', 'password':'test'}),
            content_type='application/json')
        data = response.json()

        self.assertEqual(data["status"], "failed")
        self.assertEqual(data["message"], "Already logged in.")

    def test_annoymous_should_have_restricted_access(self):
        login = self.client.login(username="test", password="test")
        self.assertFalse(login)

        # No token
        response = self.client.get("/user/change_password/")
        self.assertEqual(response.status_code, 400)

        # Invlaid token
        response = self.client.get("/user/change_password/", **{'HTTP_AUTHORIZATION':"123"})
        self.assertEqual(response.status_code, 401)

    
    def test_logged_in_user_can_access_profile(self):
        token = self.__get_user_token()

        response = self.client.get("/user/profile/", **{'HTTP_AUTHORIZATION':token})
        profile = response.json()
        self.assertIsNotNone(profile['user'])

    def test_user_can_update_preferences(self):
        token = self.__get_user_token()

        prefs = json.dumps({'prefs': {"healthTags": "", "dietTags" : "vegan"}})

        response = self.client.post("/user/set_prefs/", prefs, content_type='application/json', **{'HTTP_AUTHORIZATION':token})
        self.assertEqual(response.status_code, 200)
        
        user = User.objects.get(username='testuser1')
        self.assertEqual(user.preference_diet, "vegan")
        self.assertEqual(user.preference_health, "")

    def test_user_change_password_should_fail(self):
        token = self.__get_user_token()
    
        body = json.dumps({"old_password": "1X<IS", "new_password" : "new_password"})
        response = self.client.post("/user/change_password/", 
            body, 
            content_type='application/json', 
            **{'HTTP_AUTHORIZATION':token}
            )

        self.assertEqual(response.status_code, 400)

    def test_user_can_delete_account(self):
        token = self.__get_user_token()

        response = self.client.delete("/user/delete_user/", 
            {"user": {"username":"testuser1"}}, 
            content_type='application/json', 
            **{'HTTP_AUTHORIZATION':token})
        self.assertEqual(response.status_code, 200)

        login = self.client.login(username="testuser1", password="1X<ISRUkw+tuK")
        self.assertFalse(login)


    


        

