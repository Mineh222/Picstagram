from flask import Blueprint, request, jsonify
from app.models import Post, User
from flask_login import login_required

post_routes = Blueprint('posts', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@post_routes.route('/<username>')
@login_required
def get_user_posts(username):
    user = User.query.filter(User.username == username).first()
    posts = user.posts
    data = [post.to_dict() for post in posts]
    return {'posts': data}
