import flask
import datetime

class User:
    username = ""
    password = ""

    def __init__(self):
        self.username = ""
        self.password = ""

    def __init__(self, username, password):
        self.username = username
        self.password = password

    def get_db(self):
        users_array = ""
        file = open("users.txt", "r")
        users = file.readlines()
        file.close()
        for user in users:
            [users_array.username, users_array.password] += user.split(',')
        return users_array

    def sign_in(self):
	    users = self.get_db()
        for user in users:
            if(self.username == user.username and self.password == user.password):
                return True
        return False

    def sign_up(self, confirm_password):
        users = self.get_db()
        for user in users:
            if(self.username == user.username):
                return False
        if(self.password == confirm_password):
            file = open("users.txt", "a")
            file.write(self.username + "," + self.password + "\n")
            file.close()

