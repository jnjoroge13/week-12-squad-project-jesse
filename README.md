Welcome to the week-12-squad-project wiki!

We have decided to create a clone of StackOverFlow in combination with the stylistic aspects of Twitter.

Basically, we'll do a simple question-answer social media platform. Hopefully one that has a topic that's relevant and fun.

### FEATURE LIST

New account creation, log in, log out, and guest/demo login Users can sign up, log in, and log out. Users can use a demo log in to try the site. Users can't use certain features without logging in (like question and UpVoting posts). Logged in users are directed to their profile page which displays their question. Logged out users are directed to a page displaying several recent Questions.

Hosting on Heroku

Question Logged in users can post Questions. Logged in users can edit and delete their own Questions. All users can view a sampling of the most recent Questions.

Answers Logged in users can post Answers on Questions. Logged in users can edit and delete their own Answers. All users can view Answers on Questions.

Upvote for Answers Logged in users can Upvote Questions and Answers. Logged in users can remove their own Upvote from Questions and Answers. All users can see how many users have Upvoted a Questions or Answer.

Tags Logged in users can add tags to their Questions. All users can click on tags to view a list of recent Questions that contain that tag.

Production README Brief explanation of what the app is and does. How to start development environment Technologies used Link to live site Link to Wiki docs Discussion of two features that show off the team's technical abilities Discussion of both challenges faced and the way the team solved them Code snippets to highlight the best code

Bonus Features Display a list of recent commonly used tags. Users can search for other users to view all of their Questions.


API Routes

This web app uses the following API routes to dynamically update the page to create a single-page-app-like feel for the user for specific features.

Signup
A user must be able to sign up
POST /signup

Login
A user must be able to Login
POST /login

A user must be able to go to the login page
GET /login

Profile
A user must be able to load their profile page
GET /user/:id

Profile Update
A user must be able to sign up
Update /user/:id/update

Home
A user must be able to go to the home page with list of questions
GET /

Question
A user must be able to click on a list of question go to the question
GET /question/:id

Post A Question
A user must be able to get and post a question in a form
GET /question/new-question POST /question/new-question

Post Answers and Upvote/Downvote
A user must be able to post answers to a question
POST /question/:id


Frontend Routes


Homepage
/questions
Questions Page
/questions/:id
Individual Questions Page
/questions/new-question
New Question Form
User Stories
 Add a custom sidebar
Clone this wiki locally
https://github.com/joquack/week-12-squad-project.wiki.git
User-facing routes
/login
Log in page
This page displays a log in form

GET /login
POST /login
/signup
Sign up page
This page displays a signup form.

GET /signup
POST /signup
/
Homepage
This page displays the logo, as well as a navigation bar with login/signup or logout buttons.

GET /
/questions
Questions Page
This page displays all posted questions. There is a button to add a new question. Logged-in users have the option to delete and edit posts they have created.

GET /questions
/questions/:id
Individual Questions Page
This page displays individual questions with their associated answers. The owner of the question has the option to edit or delete the question.

GET /questions/:id
PUT /questions/:id
DELETE /questions/:id
/questions/new-question
New Question Form
This page displays a form for a logged-in user to post a question.

GET /questions/new-question
POST /questions/new-question
