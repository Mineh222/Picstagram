from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Post, User, Comment, follows
from app.forms import PostForm, CommentForm
from app.aws import (
    upload_file_to_s3, allowed_file, get_unique_filename)
from flask_wtf.csrf import validate_csrf


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

@post_routes.route('/all')
@login_required
def get_all_posts():
    posts = Post.query.all()
    data = [post.to_dict() for post in posts]
    return {'posts': data}

@post_routes.route('/<username>')
@login_required
def get_user_posts(username):
    user = User.query.filter_by(username=username).first()
    posts = user.posts
    data = [post.to_dict() for post in posts]
    return {'posts': data}


@post_routes.route('/explore/<id>')
@login_required
def get_explore_posts(id):
    posts = Post.query.filter(Post.user_id != id).all()
    data = [post.to_dict() for post in posts]
    return {'posts': data}

@post_routes.route('/demo-posts')
@login_required
def get_demo_posts():
    posts = Post.query.filter(Post.user_id == 1).all()
    data = [post.to_dict() for post in posts]
    return {'posts': data}


@post_routes.route('/feed/<int:userId>')
@login_required
def feed_posts(userId):
    posts = Post.query.join(follows, (follows.c.followed_id == Post.user_id)).filter(follows.c.follower_id == userId)
    data = [post.to_dict() for post in posts]
    return {'posts': data}


@post_routes.route('/new', methods=['POST'])
@login_required
def create_post():
    try:
        validate_csrf(request.cookies['csrf_token'])

        if "picture" not in request.files:
            return {"errors": "image required"}, 400

        image = request.files["picture"]
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
        new_post = Post(user_id=current_user.id, picture=url, caption=request.form.get('caption'))
        db.session.add(new_post)
        db.session.commit()
        return new_post.to_dict()

    except:
        return {"errors": "Invalid or missing csrf token"}, 400


@post_routes.route('/<int:id>')
@login_required
def get_single_post(id):
    post = Post.query.get(id)
    return post.to_dict()

@post_routes.route('/<id>/edit', methods=['PUT'])
@login_required
def update_post(id):
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    post = Post.query.get(id)

    if form.validate_on_submit():
        post.caption = form.data['caption']

        db.session.commit()
        return post.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@post_routes.route('/<id>/delete', methods=['DELETE'])
@login_required
def delete_post(id):
    post = Post.query.get(id)
    db.session.delete(post)
    db.session.commit()
    return post.to_dict()


# ------ Comments ------

@post_routes.route('/<id>/comments')
@login_required
def get_comments(id):
    post = Post.query.get(id)
    comments = post.comments
    data = [comment.to_dict() for comment in comments]
    return {'comments': data}


@post_routes.route('/<id>/comments/new', methods=['POST', 'GET'])
@login_required
def post_comment(id):
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_comment = Comment(
            user_id=form.data['user_id'],
            post_id=id,
            comment=form.data['comment']
        )

        db.session.add(new_comment)
        db.session.commit()
        return new_comment.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# ------ LIKES ------

@post_routes.route('/<id>/like', methods=['PUT'])
@login_required
def like_post(id):
    post = Post.query.get(id)
    post.like_post(current_user)
    db.session.commit()
    return post.to_dict()


@post_routes.route('/<id>/unlike', methods=['PUT'])
@login_required
def unlike_post(id):
    post = Post.query.get(id)
    post.unlike_post(current_user)
    db.session.commit()
    return post.to_dict()
