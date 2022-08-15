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

    post5 = Post(
        user_id = 1,
        picture="https://mypicstagrambucket.s3.us-west-1.amazonaws.com/roses-post5.jpeg",
        caption="Wake up and smell the roses!"
    )

    post6 = Post(
        user_id = 1,
        picture="https://mypicstagrambucket.s3.us-west-1.amazonaws.com/cherry-blossom-post6.jpeg",
        caption="The beautiful Cherry Blossom Tress of Japan"
    )

    post7= Post(
        user_id = 1,
        picture="https://mypicstagrambucket.s3.us-west-1.amazonaws.com/sunflower-post7.jpeg",
        caption="Alexa, play SunFlower by Post Malone"
    )

    post8 = Post(
        user_id = 2,
        picture="https://mypicstagrambucket.s3.us-west-1.amazonaws.com/cinny-post8.jpeg",
        caption="That time when I got all cleaned up for Easter"
    )

    post9 = Post(
        user_id = 2,
        picture="https://mypicstagrambucket.s3.us-west-1.amazonaws.com/cinny-post9.jpeg",
        caption="🐶👅"
    )

    post10 = Post(
        user_id = 2,
        picture="https://mypicstagrambucket.s3.us-west-1.amazonaws.com/cinny-post10.jpeg",
        caption="Trying to get inside the cookie jar"
    )

    post11 = Post(
        user_id = 2,
        picture="https://mypicstagrambucket.s3.us-west-1.amazonaws.com/cinny-post11.jpeg",
        caption="My 6 month Birthday Party!!!"
    )

    post12 = Post(
        user_id = 2,
        picture="https://mypicstagrambucket.s3.us-west-1.amazonaws.com/cinny-post13.jpeg",
        caption="Throwback to baby me"
    )

    # post13 = Post(
    #     user_id = 3,
    #     picture="https://mypicstagrambucket.s3.us-west-1.amazonaws.com/landscope-post14.webp",
    #     caption="Endless road"
    # )

    post14 = Post(
        user_id = 3,
        picture="https://mypicstagrambucket.s3.us-west-1.amazonaws.com/landscape-post15.jpeg",
        caption="Black sand beaches"
    )

    post15 = Post(
        user_id = 3,
        picture="https://mypicstagrambucket.s3.us-west-1.amazonaws.com/landscape-post16.jpeg",
        caption="Breathtaking!"
    )

    post16 = Post(
        user_id = 4,
        picture="https://mypicstagrambucket.s3.us-west-1.amazonaws.com/travel-post17.jpeg",
        caption="Take a trip to this beautiful desert and ride the camels for a magical experience"
    )

    post17 = Post(
        user_id = 4,
        picture="https://mypicstagrambucket.s3.us-west-1.amazonaws.com/travel-post18.jpeg",
        caption="Visit Sedona to see these beautiful red rocks!"
    )

    post18 = Post(
        user_id = 4,
        picture="https://mypicstagrambucket.s3.us-west-1.amazonaws.com/travel-post19.jpeg",
        caption="Maldives is the best destination for a tropical vacation"
    )

    post19 = Post(
        user_id = 5,
        picture="https://mypicstagrambucket.s3.us-west-1.amazonaws.com/nails-post20.png",
        caption="Pretty in pink set"
    )

    post20 = Post(
        user_id = 5,
        picture="https://mypicstagrambucket.s3.us-west-1.amazonaws.com/nails-post21.jpeg",
        caption="Classic french tip nails"
    )

    post21 = Post(
        user_id = 5,
        picture="https://mypicstagrambucket.s3.us-west-1.amazonaws.com/nails-post22.png",
        caption="Show this picture at your next nail appointment!"
    )

    post22 = Post(
        user_id = 6,
        picture="https://mypicstagrambucket.s3.us-west-1.amazonaws.com/fitness-post23.jpeg",
        caption="Get your core working with this killer workout!"
    )

    post23 = Post(
        user_id = 7,
        picture="https://mypicstagrambucket.s3.us-west-1.amazonaws.com/quotes-post24.jpeg",
        caption="Tough people last! 💪🏼"
    )

    post24 = Post(
        user_id = 8,
        picture="https://mypicstagrambucket.s3.us-west-1.amazonaws.com/outfit-post35.jpeg",
        caption="Can never go wrong with an all black outfit"
    )

    post25 = Post(
        user_id = 9,
        picture="https://mypicstagrambucket.s3.us-west-1.amazonaws.com/car-post26.jpeg",
        caption="Red rari"
    )

    post25 = Post(
        user_id = 9,
        picture="https://mypicstagrambucket.s3.us-west-1.amazonaws.com/car-post26.jpeg",
        caption="Red rari"
    )

    post26 = Post(
        user_id = 9,
        picture="https://mypicstagrambucket.s3.us-west-1.amazonaws.com/car-post27.jpeg",
        caption="Beemer, Benx, or Bentley?"
    )

    post27 = Post(
        user_id = 9,
        picture="https://mypicstagrambucket.s3.us-west-1.amazonaws.com/cars-post28.jpeg",
        caption="All black Audi R8"
    )

    post28 = Post(
        user_id = 10,
        picture="https://mypicstagrambucket.s3.us-west-1.amazonaws.com/surf-post29.jpeg",
        caption="Kowabunga dudes"
    )

    post29 = Post(
        user_id = 10,
        picture="https://mypicstagrambucket.s3.us-west-1.amazonaws.com/surf-post30.jpeg",
        caption="Hang 10!"
    )

    post30 = Post(
        user_id = 10,
        picture="https://mypicstagrambucket.s3.us-west-1.amazonaws.com/surf-post31.jpeg",
        caption="My favorite place in the world"
    )

    post31 = Post(
        user_id = 11,
        picture="https://mypicstagrambucket.s3.us-west-1.amazonaws.com/snow-post32.jpeg",
        caption="Shredding!!!"
    )

    # post32 = Post(
    #     user_id = 11
    #     picture="https://mypicstagrambucket.s3.us-west-1.amazonaws.com/snow-post33.webp",
    #     caption="Shredding!!!"
    # )

    post33 = Post(
        user_id = 12,
        picture="https://mypicstagrambucket.s3.us-west-1.amazonaws.com/engineer-post34.jpeg",
        caption="Spending my weekend coding, hbu? :)"
    )

    post34 = Post(
        user_id = 12,
        picture="https://mypicstagrambucket.s3.us-west-1.amazonaws.com/engineer-post35.png",
        caption="Like if you can relate!"
    )

    post35 = Post(
        user_id = 12,
        picture="https://mypicstagrambucket.s3.us-west-1.amazonaws.com/engineer-post26.jpeg",
        caption="Just learned a new language!"
    )


    # skip 13 and 32
    db.session.add(post1)
    db.session.add(post2)
    db.session.add(post3)
    db.session.add(post4)
    db.session.add(post5)
    db.session.add(post6)
    db.session.add(post7)
    db.session.add(post8)
    db.session.add(post9)
    db.session.add(post10)
    db.session.add(post11)
    db.session.add(post12)
    db.session.add(post14)
    db.session.add(post15)
    db.session.add(post16)
    db.session.add(post17)
    db.session.add(post18)
    db.session.add(post19)
    db.session.add(post20)
    db.session.add(post21)
    db.session.add(post22)
    db.session.add(post23)
    db.session.add(post24)
    db.session.add(post25)
    db.session.add(post26)
    db.session.add(post27)
    db.session.add(post28)
    db.session.add(post29)
    db.session.add(post30)
    db.session.add(post31)
    db.session.add(post33)
    db.session.add(post34)
    db.session.add(post35)

    db.session.commit()


def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
