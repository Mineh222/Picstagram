from flask import Blueprint, request
from app.models import db, Comment
from app.forms import CommentForm
from flask_login import login_required, current_user

comment_routes = Blueprint('comments', __name__)

def validation_errors_to_error_messages(validation_errors):
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@comment_routes.route('/')
@login_required
def get_all_comments():
    allComments = Comment.query.all()
    comments = [comment.to_dict() for comment in allComments]

    return {'comments': comments}

@comment_routes.route('<id>/update', methods=['PUT'])
@login_required
def update_comment(id):
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    comment = Comment.query.get(id)
    if form.validate_on_submit():
        comment.comment = form.data['comment']

        db.session.commit()
        return comment.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@comment_routes.route('<id>/delete', methods=['DELETE'])
@login_required
def delete_comment(id):
    comment = Comment.query.get(id)
    db.session.delete(comment)
    db.session.commit()
    return comment.to_dict()
