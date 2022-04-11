from flask import Flask, jsonify, redirect, request, session
import uuid

from app import db
import json

from flask_login import UserMixin, login_user, logout_user

from passlib.hash import pbkdf2_sha256


class User(UserMixin):
	def start_session(self, user):
		del user['hashed_password']
		session['logged_in'] = True
		session['user'] = user
		print(jsonify(user))
		return jsonify(user), 200

	def is_authenticated(self):
			return super().is_authenticated

	def is_active(self):
			return super().is_active

	def is_anonymous(self):
			return super().is_anonymous

	def get_id(self):
			return session['user']

	def check_user(id):
		auth_user = db.users.find_one({ "_id": id })
		if auth_user:
			return jsonify(auth_user)
		return None

	def signup(self):
		data = json.loads(request.data)
		user = {
				"_id": uuid.uuid4().hex,
				"username": data['username'],
				"email": data['email'],
				"hashed_password": data['password'],
				"is_admin": False,
				"friends": [],
				"servers": [],
		}

		user['hashed_password'] = pbkdf2_sha256.encrypt(user['hashed_password'])

		if db.users.find_one({ "email": user["email"] }):
			return jsonify({ "error": "Email address already in use" }), 400

		if db.users.find_one({ "username": user["username"] }):
			return jsonify({ "error": "Username is already in use" })


		if db.users.insert_one(user):
			login_user(user)
			return self.start_session(user)

	def logout(self):
		session.clear()
		logout_user()
		return redirect("/")

	def login(self):
			data = json.loads(request.data)

			user = db.users.find_one({ "email": data['email'] })

			if user and pbkdf2_sha256.verify(data['password'], user['hashed_password']):
				return self.start_session(user)
