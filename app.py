import flask
import user
import os

app = flask.Flask("Bibliophile")

# get html pages
def get_html(page_name):
    html_file = open(page_name + ".html")
    content = html_file.read()
    html_file.close()
    return content

# route the home page
@app.route("/", methods=["GET","POST"])
def home_page():
    index_html = get_html("index")
    return index_html

# route to go back to book viewer page
@app.route("/book_viewer")
def book_pag():
    index_html = get_html("./templates/book-viewer")
    return index_html

# route to view book after sign up
@app.route("/signup", methods=["GET","POST"])
def singup():
    index_html = ""
    name = flask.request.args.get("username")
    password =  flask.request.args.get('password')
    confirm_password =  flask.request.args.get('confirm_password')
    _user = user.User(name, password)
    print( confirm_password)
    if _user.sign_up(confirm_password):
        index_html = get_html("templates/book-viewer")
    else:
        index_html += "<p> You enter log out wrong values"
    return index_html

# route to view book after sign in
@app.route("/signin", methods=["GET","POST"])
def singin():
    index_html = ""
    name = flask.request.args.get('username')
    password = flask.request.args.get('password')
    _user = user.User(name, password)
    if(_user.sign_in()):
        index_html = get_html("./templates/book-viewer")
    else:
        index_html += "<p> You enter login wrong values"
    return index_html

# go to more page to read the chosen book
@app.route("/more")
def more():
    view_html = get_html("./templates/more")
    return view_html