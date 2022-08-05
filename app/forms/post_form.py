from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import Post

def caption_length(form, field):
    caption = field.data
    if len(caption) > 150:
        raise ValidationError('Caption cannot exceed 150 characters.')

class PostForm(FlaskForm):
    caption = TextAreaField('caption', validators=[caption_length])
