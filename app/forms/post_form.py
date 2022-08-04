from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField, FloatField, SelectField
from wtforms.validators import DataRequired, ValidationError
from app.models import Post

# need validators 

class PostForm(FlaskForm):
    user_id = IntegerField('user_id')
    picture = StringField('picture', validators=[DataRequired()])
    caption = StringField('caption')
