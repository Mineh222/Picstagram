<h1>Welcome to Picstagram!</h1>

<img src="https://i.postimg.cc/FH7pyQ2r/picstagram-logo.png"></img>

Picstagram is a clone of Instagram, the popular social media app that lets you share photos and interact with friends. On Picstagram, users can sign up or log in, explore photos on the explore page, search for and follow their favorite users, share posts, and leave likes and comments on posts. 

[Live Link to Picstagram](https://piccstagram.herokuapp.com/)

[Picstagram Documentation](https://github.com/Mineh222/Picstagram/wiki)

## Technologies

Picstagram was built using the following technologies:
* **Backend: Python and Flask**
* **Frontend: React/Redux and Javascript/JSX**
* **Database: SQLAlchemy**
* **Design/Styling: HTML and CSS**
* **Hosting: Heroku**

## Key Features

### User Authentication

* On Picstagram, users can log-in with their correct credentials, or click the demo user link for quick access to demo the application.
* Users can also sign-up, giving them access to all of Picstagram's features.
* Errors are rendered in the event of inputting invalid credentials, and must be corrected before submitting the form.

<img src="https://i.postimg.cc/qMzRgL7W/Screen-Shot-2022-08-14-at-11-26-21-PM.png"></img>

### Picture Posts (Create, Read, Update, Delete)

Logged in users can:
* View picture posts on the explore page, a user's profile page, or on their photo feed page depending on who they follow.
* Create, update, or delete their picture posts.

<img src="https://i.postimg.cc/5yqN7rsC/Screen-Shot-2022-09-21-at-10-41-31-PM.png"></img>

### Comments (Create, Read, Update, Delete)

Logged in users can:
* Read comments left on posts when clicking on a specific post and redirecting to its page.
* Create, update, or delete comments they have left on any post.

### User Profile (Read, Update)

Logged in users can:
* View profiles of all users on Picstagram.
* Update their own user profile information including: name, username, bio, and profile picture by clicking on the 'edit profile' button located on their profile page.

<img src="https://i.postimg.cc/YqRCQJGc/Screen-Shot-2022-09-21-at-10-43-11-PM.png"></img>

### Likes (Read, Update)

Logged in users can:
* View how many likes a post has.
* Like and unlike posts via the heart icon seen under any post.

### Follow (Read, Update)

Logged in users can:
* View the number of followers they or another user has from a user's profile page. A list of follower usernames can also be viewed by clicking on the "followers" count on any user's profile page.
* View the number of users a person follows from a user's profile page. A list of following usernames can also be viewed by clicking on the "following" count on any user's profile page.
* Follow and unfollow users from their user profile page by clicking on the blue "follow" or "unfollow" button.

### Search (Create, Read)

Logged in users can:
* Type in key letters or words to search for users in the search bar located inside the navbar.
* Press enter or click the magnifying glass button to view the results for their search.

### Technical Challenges 

* Implementing the likes and follows feature.
* Figuring out the database relationships between likes, users, and posts as well as between follows and users was tricky and required a lot of research as well as trial and error.
* Below is a snippet of how I implemented my follows relationship.

```JavaScript
follows = db.Table(
    "follows",
    db.Model.metadata,
    db.Column("follower_id", db.Integer, db.ForeignKey("users.id")),
    db.Column("followed_id", db.Integer, db.ForeignKey("users.id"))
)


    followed = db.relationship(
        'User', secondary=follows,
        primaryjoin=(follows.c.follower_id == id),
        secondaryjoin=(follows.c.followed_id == id),
        backref=db.backref('follows', lazy='dynamic'), lazy='dynamic')
```

## Future Improvements 

* Allow users to add comments to a post from the photo feed page.
* Allow users to search for keywords that will show results of photos that are related.
* Notifications page to view who has liked or commented on your posts.

## Installation Instructions
After cloning Picstagram into your desired directory:
* In the root directory, run 'pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt' to install dependencies
* Cd into the 'react-app' directory and run 'npm install' to install dependencies
* In the root directory, and create an '.env' file based off of the example provided in the '.env.example' file
* To set up the database:
> * Run the command 'pipenv shell' to open the virtual environment
> * In the root directory, run 'flask db upgrade' to create the database
> * In the root directory, run 'flask db seed all' to add all models and seeders into your database
* To run the app in development mode: 
> * In one terminal, in the root directory run the command 'flask run'
> * In another terminal, cd into the frontend directory 'react-app' and run the command 'npm start'
> * With both terminals running, navigate to 'localhost:3000'. Congrats, you've successfully installed and ran Picstagram!
