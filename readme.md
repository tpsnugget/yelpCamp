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