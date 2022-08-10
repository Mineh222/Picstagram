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
    comments = db.relationship("Comment", back_populates="post", cascade="all, delete")

    post_likes = db.relationship("User",
            secondary=likes,
            back_populates="user_likes",
    )

    def has_liked_post(self, user):
        user_likes = [user.id for user in self.post_likes]
        return user.id in user_likes

    def like_post(self, user):
        if not self.has_liked_post(user):
            self.post_likes.append(user)

    def unlike_post(self, user):
        if self.has_liked_post(user):
            self.post_likes.remove(user)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'picture': self.picture,
            'caption': self.caption,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'user': self.user.to_dict_short(),
            'comments': [comment.to_dict() for comment in self.comments],
            'likes': [user.to_dict_short() for user in self.post_likes]
        }
