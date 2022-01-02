from flask import Flask, render_template, request, redirect, url_for, session, flash, get_flashed_messages
import data_manager
import util


app = Flask(__name__)
app.secret_key = 'apiwars'


@app.route('/')
def index():
    return render_template("index.html")


@app.route("/register", methods=['GET', 'POST'])
def register():
    session.pop('_flashes', None)
    if request.method == 'POST':
        if request.form['username'] == "" or request.form['password'] == "":
            flash("Please, fill in both fields.", "error")
        elif data_manager.is_username(request.form['username']) == 'TRUE':
            flash("Username already exists, please choose another one!", "error")
        else:
            flash("Successful registration. Log in to continue.")
            username = request.form['username']
            password = request.form['password']
            hashed_password = util.hash_password(password)
            data_manager.registration(username, hashed_password)
    return render_template('registration.html')


@app.route('/login', methods=['GET', 'POST'])
def login():
    usernames = data_manager.get_usernames()
    if request.method == 'POST':
        if request.form['username'] in usernames:
            username = request.form['username']
            password = request.form['password']
            if util.verify_password(password, data_manager.get_user_password(username)):
                session['username'] = username
                session['id'] = data_manager.get_user_id_by_user_name(username)['id']
                return redirect("/")
            else:
                flash('Wrong username or password.')
        else:
            flash('Wrong username or password.')
    return render_template('login.html')


@app.route("/logout")
def logout():
    session.pop('username', None)
    session.pop('id', None)
    return redirect("/")


if __name__ == "__main__":
    app.run(debug=True)