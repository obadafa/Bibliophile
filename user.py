import flask
import datetime
import os

class User:
    username = ""
    password = ""

    # Parameterized constructor
    def __init__(self, username, password):
        self.username = username
        self.password = password

    # read usernames and passwords
    def get_db(self):
        users_array = ''
        if os.path.exists('users.txt'):
            file = open("users.txt", "r")
            users = file.readlines()
            file.close()
            users_array = [user[:-1].split('$$$') for user in users]
        else:
            file = open("users.txt", "x")
            file.close()
        return users_array

    # sign in function
    def sign_in(self):
        users = self.get_db()
        for username, password in users:
            if(self.username == username and self.password == password):
                return True
        return False

    # sign up function
    def sign_up(self, confirm_password):
        users = self.get_db()
        for user in users:     
            if(self.username == user[0]):
                return False
        if(self.password != confirm_password):
            return False
        file = open("users.txt", "a")
        file.write(self.username + "$$$" + self.password + "\n")
        file.close()
        return True

