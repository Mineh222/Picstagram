from .db import db
from .like import likes
from .follow import follows
from sqlalchemy.sql import func
from sqlalchemy import DateTime
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    full_name = db.Column(db.String(100), nullable=False)
    username = db.Column(db.String(40), nullable=False, unique=True)
    bio = db.Column(db.String(150))
    profile_pic = db.Column(db.String(255), default="https://mypicstagrambucket.s3.us-west-1.amazonaws.com/no-profile-picture-icon-18.jpeg")
    hashed_password = db.Column(db.String(255), nullable=False)
    created_at = db.Column(DateTime(timezone=True), server_default=func.now())
    # updated_at = db.Column(DateTime(timezone=True), onupdate=func.now())

    posts = db.relationship("Post", back_populates="user")
    comments = db.relationship("Comment", back_populates="user")

    user_likes = db.relationship("Post",
            secondary=likes,
            back_populates="post_likes",
            cascade="all, delete"
    )

    followers = db.relationship(
        "User",
        secondary=follows,
        primaryjoin=(follows.c.follower_id == id),
        secondaryjoin=(follows.c.followed_id == id),
        backref=db.backref("following", lazy="dynamic"),
        lazy="dynamic"
    )
    # this relationship allows you to access both the collection of users
    # that follow a given user (with user.followers), and the collection
    # of users that a user follows (with user.following)


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'full_name': self.full_name,
            'username': self.username,
            'bio': self.bio,
            'profile_pic': self.profile_pic,
            'created_at': self.created_at,
        }
