from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        email='demo@aa.io', full_name='Demo User', username='Demo', bio="Hi! I'm Demo User. Please feel free to use my account to browse Picstagram and all its features! :)", profile_pic='https://mypicstagrambucket.s3.us-west-1.amazonaws.com/rose.jpeg', password='password')
    cinnamon = User(
        email='cinnamon@gmail.com', full_name='Cinnamon Gharabegi', username='Cinnamon', bio="Hi, I'm Cinnamon 🐶. You can call me Cinny.", profile_pic='https://mypicstagrambucket.s3.us-west-1.amazonaws.com/67937574350__61C71683-671A-4EEE-9D43-B56C7C999635.jpeg', password='password')
    bobbie = User(
        email='bobbie@aa.io', full_name='Billy Bob', username='bobbie', bio='Photographer 📷 Follow me if you like beautiful landscape pictures!', profile_pic='https://mypicstagrambucket.s3.us-west-1.amazonaws.com/bobbie.jpeg', password='password')

    db.session.add(demo)
    db.session.add(cinnamon)
    db.session.add(bobbie)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
