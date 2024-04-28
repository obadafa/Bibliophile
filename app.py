import flask
import user
import os

app = flask.Flask("Bibliophile")

def get_html(page_name):
    html_file = open(page_name + ".html")
    content = html_file.read()
    html_file.close()
    return content

@app.route("/", methods=["GET","POST"])
def homepage():
    index_html = get_html("index")
    return index_html

@app.route("/templates/book-viewer", methods=["GET","POST"])
def singin():
    name = flask.request.args.get("username")
    password = flask.request.args.get("password")
    user = user.User(name, password)
    user.User.sign_in()
    return ""

@app.route("/templates/book-viewer", methods=["GET","POST"])
def singup():
    name = flask.request.args.get("username")
    password = flask.request.args.get("password")
    confirm_password = flask.request.args.get("confirm_password")
    user = user.User(name, password)
    user.User.sign_up(confirm_password)
    return ""

@app.route("/more")
def more():
    view_html = get_html("./templates/more")
    return view_html