from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, db
from app.forms import UserProfileForm
from app.aws import (
    upload_file_to_s3, allowed_file, get_unique_filename)
from flask_wtf.csrf import validate_csrf

user_routes = Blueprint('users', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict_short_home_page() for user in users]}


@user_routes.route('/profile/<username>')
@login_required
def user(username):
    user = User.query.filter(User.username == username).first()
    return user.to_dict()


@user_routes.route('/search/<searchword>')
def search_user(searchword):
    users = db.session.query(User).filter(User.username.ilike(f"%{searchword}%"))
    data = [user.to_dict_short() for user in users]
    return {'users': data}


@user_routes.route('/profile/<int:id>/new-profile-pic', methods=['POST'])
@login_required
def upload_profile_pic(id):
    try:
        validate_csrf(request.cookies['csrf_token'])

        if "profile_pic" not in request.files:
            return {"errors": "image required"}, 400

        image = request.files["profile_pic"]
        if not allowed_file(image.filename):
            return {"errors": "file type not permitted"}, 400
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)
        if "url" not in upload:
            # if the dictionary doesn't have a url key
            # it means that there was an error when we tried to upload
            # so we send back that error message
            return upload, 400
        url = upload["url"]
        # flask_login allows us to get the current user from the request
        new_profile_pic = User.query.get(id)
        new_profile_pic.profile_pic=url
        db.session.commit()
        return new_profile_pic.to_dict()

    except:
        return {"errors": "Invalid or missing csrf token"}, 400


@user_routes.route('/profile/<int:id>/edit', methods=['PUT'])
@login_required
def update_user_profile(id):
    form = UserProfileForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    user_profile = User.query.get(id)

    if form.validate_on_submit():
        user_profile.full_name = form.data['full_name']
        user_profile.username = form.data['username']
        user_profile.bio = form.data['bio']

        db.session.commit()
        return user_profile.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


# ------ follows ------

@user_routes.route('/<username>/follow', methods=['PUT'])
@login_required
def follow(username):
    user = User.query.filter(User.username == username).first()
    current_user.follow(user)
    db.session.commit()
    return user.to_dict()


@user_routes.route('/<username>/unfollow', methods=['PUT'])
@login_required
def unfollow(username):
    user = User.query.filter(User.username == username).first()
    current_user.unfollow(user)
    db.session.commit()
    return user.to_dict()
