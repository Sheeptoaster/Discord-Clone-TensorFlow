from flask import Blueprint, jsonify, session, request
from flask_login import current_user, login_user, logout_user, login_required
from app import db
from ..models.users import User
from passlib.hash import pbkdf2_sha256
import json


auth_routes = Blueprint('auth', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@auth_routes.route('/')
def authenticate():
	if User().is_authenticated():
		return jsonify(User().get_id())
	return {'errors': ['Unauthorized']}


@auth_routes.route("/login", methods=["POST"])
def login():
	return User().login()


@auth_routes.route("/logout")
def logout():
	return User().logout()

@auth_routes.route("/sign-up", methods=["POST"])
def signup():
	return User().signup()
