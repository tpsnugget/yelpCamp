# Version 1: Colt Steele's Web Dev Bootcamp, Section 28, Chapter 289
# Initial Routes
   npm init
   npm install express ejs --save
   Added app.js
   Added views director
   Added landing.ejs as our landing page
   Added campgrounds route
   Added a campgrounds array that will soon be moved to a database
   Add an a tag with a button to go from the landing page to the campgrounds page
   Passed the data from the route to the campgrounds page
   Looped through the data on the campgrounds page and displayed it

# Version 2: Colt Steele's Web Dev Bootcamp, Section 28, Chapter 290
# Layout
   - Added in header and footer partials in views/partials/
   - Added Bootstrap 4 to header.ejs

# Version 3: Colt Steele's Web Dev Bootcamp, Section 28, Chapter 291
# Creating Campgrounds
   Setup new Campground POST route
   Added in body-parser
   Setup route to show form
   Added basic unstyled form

# Version 4: Colt Steele's Web Dev Bootcamp, Section 28, Chapter 294
# Styling Campgrounds
   - Added a jumbotron to campgrounds
   - Added img-thumbnail to img tags

# Version 5: Colt Steele's Web Dev Bootcamp, Section 28, Chapter 295
# Styling Nav and Forms
   Added navbar to header.ejs
   Center the Add a New Campground Form
   Stack the form inputs vertically

# Version 6: Colt Steele's Web Dev Bootcamp, Section 29, Chapter 296
# Databases: What is a database?
   - What is a database?
      - A collection of information / data
      - Has an interface
   - SQL (relational) vs. NoSQL (non-relational)

# Version 6: Colt Steele's Web Dev Bootcamp, Section 29, Chapter 298
# Databases: Installing MongoDB

# Version 6: Colt Steele's Web Dev Bootcamp, Section 29, Chapter 301
# Databases: Introduction to Mongoodse Pt. 1 and Pt. 2
   npm i mongoose --save

# Version 7: Colt Steele's Web Dev Bootcamp, Section 30, Chapter 303
# YelpCamp: Data Persistence
   - Created a yelp_camp db and connected it to our App

# Version 8: Colt Steele's Web Dev Bootcamp, Section 30, Chapter 305
# YelpCamp: Campground Show Page Part 1 and 2
   Restful Routes
      Index Route    /campgrounds      GET   Show all campgrounds
      New Route      /campgrounds/new  GET   Displays for to make a new campground
      Create Route   /campgrounds      POST  Add a new campground to the db
      Show Route     /campgrounds/:id  GET   Shows info about one campground

# C1:33:324 - 334: Colt Steele's Web Dev Bootcamp
# C1:33:324: YelpCamp: Comments: YelpCamp: Refactoring app.js
   - Created a models directory
      - Created ./models/campgrounds.js
   - Added modules.exports
   - Required everything properly

# C1:33:324 - 334: Colt Steele's Web Dev Bootcamp
# C1:33:326: YelpCamp: Comments: YelpCamp: Seeding the Database
   Added seeds.js in the main directory
   Removed all campgrounds
   Added some seed campgrounds after the deletion. This will allow in the future
      that we can ensure comments are working properly w/o having to write all the
      routes first.

# C1:33:324 - 334: Colt Steele's Web Dev Bootcamp
# C1:33:328: YelpCamp: Comments: YelpCamp: Comment Model

# C1:33:324 - 334: Colt Steele's Web Dev Bootcamp
# C1:33:330: YelpCamp: Comments: YelpCamp: Comments Pt. 1
   - Nested ROUTES
   - Added views/comments directory
      - Added a new.ejs file to this directory
   - Added views/campgrounds directory
      - Moved index.ejs, new.ejs, show.ejs to this new directory
      - Had to add ../ to the beginning of partials/header and footer since the
         files have now been moved

# C1:33:324 - 334: Colt Steele's Web Dev Bootcamp
# C1:33:331: YelpCamp: Comments: YelpCamp: Comments Pt. 2
   Added POST ROUTE for new comment submission
   Need to:
      Lookup campground using id
      Create new comment
      Connect new comment to campground
      Redirect to campground page to see new comment

# C1:33:324 - 334: Colt Steele's Web Dev Bootcamp
# C1:33:332: YelpCamp: Comments: YelpCamp: Styling Comments Pt. 1
   - Styling with Bootstrap 4
   - Added a container for everythng in show.ejs
   - Added a class="row" container
      - Left sidebar class="col-md-3"
      - Main content class="col-md-9"

# C1:33:324 - 334: Colt Steele's Web Dev Bootcamp
# C1:33:334: YelpCamp: Comments: YelpCamp: Styling Comments Pt. 2
   Added public and then public/stylesheets directories
   Added main.css

# C1:35:342 - 346: Colt Steele's Web Dev Bootcamp
# C1:35:342: YelpCamp: Adding Auth Pt. 1
   - Install packages needed for auth
      - npm i --save passport passport-local passport-local-mongoose express-session
   - Define User model

# C1:35:342 - 346: Colt Steele's Web Dev Bootcamp
# C1:35:343: YelpCamp: Adding Auth Pt. 2
   Added auth ROUTES
      Show register FORM
      app.get("/register"...)

# C1:35:342 - 346: Colt Steele's Web Dev Bootcamp
# C1:35:344: YelpCamp: Adding Auth Pt. 3
   - Added Login ROUTES
   - Added Login template

# C1:35:342 - 346: Colt Steele's Web Dev Bootcamp
# C1:35:345: YelpCamp: Adding Auth Pt. 4
   Added Logout ROUTE
   Prevented User from adding a comment if not logged in
   Added links to navbar
   Showed / hid auth links correctly

# C1:35:342 - 346: Colt Steele's Web Dev Bootcamp
# C1:35:346: YelpCamp: Adding Auth Pt. 5
   - Show / hide auth links in navbar correctly
