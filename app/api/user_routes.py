from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/profile/<username>')
@login_required
def user(username):
    user = User.query.filter(User.username == username).first()
    return user.to_dict()
