from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField
from wtforms.validators import DataRequired, Length, ValidationError
from app.models import User


def username_exists(form, field):
    # Make sure it does not check current user's username
    current_user = User.query.get(form.data['id'])
    if (field.data == current_user.username):
        return
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

class UserProfileForm(FlaskForm):
    id = IntegerField('id')
    full_name = StringField('full_name', validators=[DataRequired()])
    username = StringField(
        'username', validators=[DataRequired(), username_exists])
    bio = TextAreaField('bio', validators=[Length(max=150, message="Bio cannot exceed 150 characters")])
