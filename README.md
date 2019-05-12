# travel-planner
A trip planner for my future travels

## Instructions
1. Navigate to the projects directory and type 'yarn' into the terminal, to install all of the packages
2. Run the database migrations
```
yarn knex migrate:latest
```
3. Seed the database with dummy database
```
yarn knex seed:run
```
4. Type 'yarn start' into the terminal to run the server, and navigate to localhost:3000 in your local browser
5. Users can register an account and log in
6. Destinations, activities and accommodation can be viewed/added/updated and deleted

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
* Authorisation - individuals can only see their own trips
* Update Instructions
* Display content in different layouts, depending on whether or not the user is logged in

## Learning
* Configuring PostgreSQL so I could use Knex to migrate/seed and perform CRUD actions on my local database
* Learn how to use flash messages: stores message in a session and then displays it after the redirect
	* Set up middleware for express-session and connect-flash (app.js)
	* Custom middleware so we can add colours to messages (app.js)
	* Create flash message (e.g. ``` req.flash("successMsg", "You are now registered and can log in"); ``` (app.js))
* Authentication + Authorisation using bcrypt and passport (see below)

## Authentication and Authorisation
* Helpful youtube video by Traversy Media (node, express, mongodb/mongoose, ejs, passport): https://www.youtube.com/watch?v=6FOq4cUdH8k

#### We will have 3 types of users:
* Visitors - can only view the homepage
* Logged In User - can only view the their page
* Admin User - can view any page; can de-activate users;

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

#### Authorization:
* Visitors can only see the homepage
	* ensureAuthenticated middleware
		* Checks if user is authenticated
		* Redirect to login form if user is not authenticated, and display an error message
* Logged in users can only see their destinations
	* Only destinations with a destinationId matching the userId in the passport cookie will be displayed



	* [ ] redirect to user page if they visit the homepage
		* [ ] set user_id in localStorage after login/signup
* [ ] Add GET /auth/logout to clear user_id cookie
	* [ ] redirect to login page

### Admin Page:
* [ ] Admin page that lists all users
	* [ ] admin table with user_id (unique constraint)
	* [ ] de-activate users
* [ ] Admin can see any page on site

### Other ways to auth:
* [ ] Use sessions instead of cookies!
* [ ] Use JWTs instead of sessions!
