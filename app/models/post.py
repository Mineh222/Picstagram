from .db import db
from .like import likes
from sqlalchemy import DateTime
from sqlalchemy.sql import func

class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    picture = db.Column(db.String(255), nullable=False)
    caption = db.Column(db.String(500))
    created_at = db.Column(DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(DateTime(timezone=True), onupdate=func.now())

    user = db.relationship("User", back_populates="posts", lazy='subquery')
    comments = db.relationship("Comment", back_populates="post")

    post_likes = db.relationship("User",
            secondary=likes,
            back_populates="user_likes",
            cascade="all, delete"
    )

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'picture': self.picture,
            'caption': self.caption,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'user': self.user.to_dict(),
            'comments': [comment.to_dict() for comment in self.comments]
        }
