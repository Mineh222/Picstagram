from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError, Length
from app.models import User
import re


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


def password_match(form, field):
    password = form.data['password']
    confirmPassword = form.data['confirmPassword']
    if (password != confirmPassword):
        raise ValidationError('Password fields must match.')

def password_validate(form, field):
    password = field.data
    if(not re.fullmatch('^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{8,}$', password)):
        raise ValidationError('Password must be a minimum of 8 characters and contain at least 1 lowercase letter, uppercase letter, number, and special character (i.e. "!@#$%^&*")')


def email_validate(form, field):
    email = field.data
    if (not re.fullmatch('[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}', email)):
        raise ValidationError('Please enter a valid email')


class SignUpForm(FlaskForm):
    email = StringField('email', validators=[DataRequired(), user_exists, email_validate])
    full_name = StringField('full_name', validators=[DataRequired(), Length(max=40, message="Full Name cannot exceed 40 characters")])
    username = StringField(
        'username', validators=[DataRequired(), username_exists, Length(max=20, message="Username cannot exceed 20 characters")])
    password = StringField('password', validators=[DataRequired(), password_validate])
    confirmPassword = StringField('confirmPassword', validators=[DataRequired(), password_match])
