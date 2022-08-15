from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        email='demo@aa.io', full_name='Demo User', username='Demo', bio="Hi! I'm Demo User. Please feel free to use my account to browse Picstagram and all its features! :)", profile_pic='https://mypicstagrambucket.s3.us-west-1.amazonaws.com/rose.jpeg', password='password')
    cinnamon = User(
        email='cinnamon@gmail.com', full_name='Cinnamon Gharabegi', username='Cinnamon', bio="Hi, I'm Cinnamon 🐶. You can call me Cinny.", profile_pic='https://mypicstagrambucket.s3.us-west-1.amazonaws.com/67937574350__61C71683-671A-4EEE-9D43-B56C7C999635.jpeg', password='password')
    bobbie = User(
        email='bobbie@aa.io', full_name='Billy Bob', username='bobbie', bio='Photographer 📷 Follow me if you like beautiful landscape pictures!', profile_pic='https://mypicstagrambucket.s3.us-west-1.amazonaws.com/bobbie.jpeg', password='password')
    travel = User(
        email='travel@gmail.com', full_name='Best Vacations', username='bestvacations', bio='Journey with us 🌎 and find your next vacation! We travel the world non stop!', profile_pic="https://mypicstagrambucket.s3.us-west-1.amazonaws.com/travel-propic.jpeg", password='password'
    )
    nails = User(
        email='nails@gmail.com', full_name='Nail Art', username='nailart', bio='Nail art inspo 💅🏼', profile_pic='https://mypicstagrambucket.s3.us-west-1.amazonaws.com/nails-propic.jpeg', password='password'
    )
    fitness = User(
        email='fitness@gmail.com', full_name='Fitness Inspo', username='fitspo', bio='Want to get in the best shape of your life? Follow us for fitness tips and inspiration!', profile_pic="https://mypicstagrambucket.s3.us-west-1.amazonaws.com/fitness-propic.jpeg", password="password"
    )
    quotes = User(
        email='quotes@gmail.com', full_name='Motivational Quotes', username='bestquotes', bio='Daily affirmations and motivation quotes. Follow us to improve your mental health. 🧠.', profile_pic="https://mypicstagrambucket.s3.us-west-1.amazonaws.com/quotes-propic.jpeg", password="password"
    )
    fashion = User(
        email='fasion@gmail.com', full_name="Fashion Daily", username="fashiondaily", bio="All fashion, all the time, from minimalist to trendy.", profile_pic="https://mypicstagrambucket.s3.us-west-1.amazonaws.com/fasion-propic.jpg", password="password"
    )
    cars = User(
        email='cars@gmail.com', full_name="Luxury Cars", username="luxurycars", bio="Daily dose of luxury cars ✨ We post your dream cars!", profile_pic="https://mypicstagrambucket.s3.us-west-1.amazonaws.com/cars-propic.jpeg", password="password"
    )
    surfer = User(
        email='surfer@gmail.com', full_name="Surf Dude", username="surfsup22", bio="Kowabunga dudes & dudettes. I'm so pumped to be on this surfing kick. Follow to watch me catchin' gnarly waves 🌊", profile_pic="https://mypicstagrambucket.s3.us-west-1.amazonaws.com/surfer-propic.jpeg", password="password"
    )
    snowboarder = User(
        email="snowboarder@gmail.com", full_name="Pro Snowboarder", username="boardingislife", bio="Snowboarding content. Shredding with passion 🏂", profile_pic="https://mypicstagrambucket.s3.us-west-1.amazonaws.com/snowboarder-propic.jpeg", password="password"
    )
    engineer = User(
        email="engineer@gmail.com", full_name="Software Engineer", username="code4life", bio="Beginner software engineer just sharing my learning journey. Follow to come along my stressful yet fulfilling journey 👩🏻‍💻", profile_pic="https://mypicstagrambucket.s3.us-west-1.amazonaws.com/engineer-propic.jpeg", password='password'
    )

    db.session.add(demo)
    db.session.add(cinnamon)
    db.session.add(bobbie)
    db.session.add(travel)
    db.session.add(nails)
    db.session.add(fitness)
    db.session.add(quotes)
    db.session.add(fashion)
    db.session.add(cars)
    db.session.add(surfer)
    db.session.add(snowboarder)
    db.session.add(engineer)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
