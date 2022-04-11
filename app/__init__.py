import os
from flask import Flask, jsonify, request, redirect
from flask_cors import CORS
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager
import pymongo
from pymongo import ReturnDocument
from pymongo.server_api import ServerApi
import uuid
from passlib.hash import pbkdf2_sha256



from .config import Config

app = Flask(__name__)

client = pymongo.MongoClient(os.environ.get("MONGO_URI"), server_api=ServerApi("1"))
db = client.chatbot_ai

b_server = db.servers.find_one({ "server_name": "bot_server" })
user = db.users.find_one({ "username": "Sheeptoaster" })



if user == None:
	new_user = {
		"_id": uuid.uuid4().hex,
		"username": "Sheeptoaster",
		"email": "jweber04005@msn.com",
		"hashed_password": pbkdf2_sha256.encrypt(os.environ.get("HASH_PASS")),
		"is_admin": True,
		"friends": [],
		"servers": [],
	}
	db.users.insert_one(new_user)

if b_server == None:

	new_server = {
		"_id": uuid.uuid4().hex,
		"server_name": "bot_server",
		"server_img": "https://res.cloudinary.com/dsjuna344/image/upload/v1649491888/robot_makvwo.jpg",
		"owner_id": user["_id"],
		"users": [user["_id"]],
		"messages": [
			{ "Bot": "Hello and welcome to my Discord Clone." }
		],
	}
	db.servers.insert_one(new_server)
	db.users.find_one_and_update(
		{ "username": "Sheeptoaster" },
		{ "$push": { "servers": new_server["_id"] } }
	)

login = LoginManager(app)
login.login_view = 'auth.unauthorized'



from .models.users import User

@login.user_loader
def load_user(id):
	return User.check_user(id)

from .api.auth_routes import auth_routes

app.register_blueprint(auth_routes, url_prefix='/api/auth')
app.config.from_object(Config)

CORS(app)


@app.before_request
def https_redirect():
    if os.environ.get('FLASK_ENV') == 'production':
        if request.headers.get('X-Forwarded-Proto') == 'http':
            url = request.url.replace('http://', 'https://', 1)
            code = 301
            return redirect(url, code=code)

@app.after_request
def inject_csrf_token(response):
    response.set_cookie(
        'csrf_token',
        generate_csrf(),
        secure=True if os.environ.get('FLASK_ENV') == 'production' else False,
        samesite='Strict' if os.environ.get(
            'FLASK_ENV') == 'production' else None,
        httponly=True)
    return response


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    if path == 'favicon.ico':
        return app.send_static_file('favicon.ico')
    return app.send_static_file('index.html')
