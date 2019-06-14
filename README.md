# travel-planner-auth
A travel-planner application built using PostgreSQL and Passport.js.

The app has been deployed to Heroku, and can be accessed here: https://tripstar.herokuapp.com

## Instructions
1. Navigate to the projects directory and type 'npm install' into the terminal, to install all of the packages
2. Create PostgreSQL database using the command line
	```
	createdb <DATABASE_NAME>
	```
3. Configure the project to point at the database
	* Set up a .env file, which should include the following information
	```
	DB_USER=<YOUR_USER_NAME_GOES_HERE>
	DB_PASSWORD=<YOUR_PASSORD_GOES_HERE>
	DB=<YOUR_DATABASE_NAME_GOES_HERE>
	```
3. Run the database migrations
	```
	knex migrate:latest
	```
4. Seed the database with dummy database
	```
	knex seed:run
	```
5. Type 'nodemon' into the terminal to run the server, and navigate to localhost:3000 in your local browser
6. Users can register an account and log in to view their planned trips
7. Destinations, activities and accommodation can be added/viewed/updated/deleted (CRUD)

## Planning
### Database Information
* Destination: Image (required), City name (required), Country name (required), Dates, Arrival info, Departure info
* Activities: Name (required), Website, Notes
* Accommodation: Name (required), Address, Website, Notes

### Colour Palette
* https://colorhunt.co/palette/144191 

### To Do
* DONE: "Accommodation" section (separate table in database) - due to potential one-to-many relationship
* DONE: "Activities" section (separate table in database) - due to one-to-many relationship
* DONE: API search to find an image of the city, if the user doesn't provide one themselves
* DONE: Authentication - users can register an account and log in
* DONE: Authorisation - individuals can only see their own trips
* DONE: Authorisation - individuals can only make changes to their own destinations/activities/accommodation
* DONE: Redirect to the user's dashboard if a logged-in user visits the home route
* DONE: Redirect to the user's dashboard if a logged-in user tries to visit the login/register pages
* DONE: Display content in different layouts, depending on whether or not the user is logged in
* DONE: Use database table joins to allow further protection of activities and accommodations routes (include only one express route parameter per route)
* DONE: User login/registration email should not be case-sensitive
* DONE: Deploy app to Heroku

## Learning
* Using express router (an isolated instance of middleware and routes - can be used as an argument to an "app.use()" method - can add middleware and HTTP method routes to the router object)
* Using express route parameters to query the database
* Using the Unsplash Source API + JavaScript to search and display an image based on the user's chosen country input
* Using Handlebars.js to set up a main template to render many page layouts, and also to display database information
* Learn how to use flash messages: stores message in a session and then displays it after the redirect
	* Set up middleware for express-session and connect-flash (app.js)
	* Custom middleware so we can add colours to messages (app.js)
	* Create flash message (e.g. ``` req.flash("successMsg", "You are now registered and can log in"); ``` (app.js))
* Hosting app on Heroku with PostgreSQL database
	* Helpful websites:
		* https://codeselfstudy.com/blog/deploy-node-postgres-heroku/
		* https://medium.com/@vapurrmaid/getting-started-with-heroku-postgres-and-pgadmin-run-on-part-2-90d9499ed8fb

### Databases (using PostgreSQL and Knex.js)
* Configuring PostgreSQL so I could use Knex.js to migrate/seed and perform CRUD actions on my local database
* Using Knex.js to set up and interact with the database
	* Migrations: allow database chnges/updates via generated scripts (e.g. creating/dropping tables, updating a table with new columns)
	* Good info about Migrations and Seeds: https://gist.github.com/NigelEarle/70db130cc040cc2868555b29a0278261
* Using Knex.js to create tables with a one-to-many relationship (using migrations + seeding) using foreign keys
	* This article was very helpful: https://medium.com/@jaeger.rob/seed-knex-postgresql-database-with-json-data-3677c6e7c9bc
* Learned how to do database table joins to return information from two different tables simultaneously

### Authentication and Authorisation (using bcrypt.js and Passport.js)
* Helpful youtube video by Traversy Media (node, express, mongodb/mongoose, ejs, passport): https://www.youtube.com/watch?v=6FOq4cUdH8k

### Setup
* Install dependencies: bcryptjs, passport, passport-local, connect-flash, express-session, (express)

### Authentication
* Set up users router which contains its own authorisation ROUTES
* Set up users pages (Welcome, Login, Register)
* Register users
	* Set up user with POST /users/register route
	* Validate required fields (see users.js - passport must be 6+ characters, passwords must match)
	* Check if email is unique (see users.js)
	* Hash password with bcrypt and then insert the new user into the database (see users.js)
* Login user with POST /users/login route (see passport.js, app.js, users.js)
	* Check if email is in database
		* Compare password with hashed password in db
		* Set a cookie with userId (serializeUser and deserializeUser)
* Protect routes by implementing ``` ensureAuthenticated() ``` function (auth.js)
* Logout user with /users/logout route, which will clear the userId passport cookie

### Authorization:
* Visitors can only see the homepage
	* ensureAuthenticated middleware
		* Checks if user is authenticated
		* Redirect to login form if user is not authenticated, and display an error message
* Logged in users can only see their destinations
	* Only destinations with a destinationId matching the userId in the passport cookie will be displayed
	* Redirect logged in users to their ``` "/destinations" ``` page if they visit the home route