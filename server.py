from flask import Flask, render_template, request, redirect, url_for, session, jsonify

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')