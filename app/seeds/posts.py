from app.models import db, Post

def seed_posts():
    post1 = Post(
        user_id = 1,
        picture='https://mypicstagrambucket.s3.us-west-1.amazonaws.com/post1.png',
        caption="Another pretty flower in my neighbor's garden :)"
    )

    post2 = Post(
        user_id = 1,
        picture='https://mypicstagrambucket.s3.us-west-1.amazonaws.com/post2.jpeg',
        caption="Planted some daises!!"
    )

    post3 = Post(
        user_id = 1,
        picture='https://mypicstagrambucket.s3.us-west-1.amazonaws.com/post3.jpeg',
        caption='Garden Goals'
    )

    post4 = Post(
        user_id = 2,
        picture='https://mypicstagrambucket.s3.us-west-1.amazonaws.com/IMG_1060.jpeg',
        caption='Goodnight 😴'
    )

    db.session.add(post1)
    db.session.add(post2)
    db.session.add(post3)
    db.session.add(post4)

    db.session.commit()


def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
