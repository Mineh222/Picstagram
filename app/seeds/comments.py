from app.models import db, Comment

def seed_comments():
    comment1 = Comment(
        user_id = 3,
        post_id = 1,
        comment = "Wow! What a beautiful flower."
    )

    comment2 = Comment(
        user_id = 2,
        post_id = 1,
        comment = "Your neighbor has the best flowers!"
    )

    comment3 = Comment(
        user_id = 1,
        post_id = 4,
        comment = "Sweet dreams cutie!"
    )

    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)

    db.session.commit()

def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
