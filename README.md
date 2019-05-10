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
5. Destinations, activities and accommodation can be viewed/added/updated and deleted

## Planning
### Database Information
* Destination: Image (required), City name (required), Country name (required), Dates, Arrival info, Departure info
* Activities: Name (required), Website, Notes
* Accommodation: Name (required), Address, Website, Notes

### Colour Palette
* https://colorhunt.co/palette/144191

### Future ideas
* DONE: "Accommodation" section (separate table in database) - due to potential one-to-many relationship
* DONE: "Activities" section (separate table in database) - due to one-to-many relationship
* DONE: API search to find an image of the city, if the user doesn't provide one themselves
* Login: allows other individuals to also add trips (would each require a unique customer id)

## Learning
* Learnt how to initialise and set up yarn to install dependencies
* Learnt how to add 'scripts' into package.json to run certain commands (e.g. 'yarn dev' will run 'nodemon index')
* Learnt about the express router (an isolated instance of middleware and routes - can be used as an argument to an "app.use()" method - can add middleware and HTTP method routes to the router object)
* Using Knex.js to set up a SQLite database (including Migrations & Seeding. Migrations are a way to make database changes/updates via generated scripts, like creating or dropping tables, or updating a table with new columns)
* - Good info about Migrations (including adding/dropping columns) and seeds: https://gist.github.com/NigelEarle/70db130cc040cc2868555b29a0278261
* Using Knex.js with SQLite to make database queries
* Used handlebars to set up a main template to render many page layouts, and also to display database information
* Using express route parameters to query the database
* Using Knex.js to create tables with a one-to-many relationship (using migrations + seeding) using foreign keys
* - This article was very helpful: https://medium.com/@jaeger.rob/seed-knex-postgresql-database-with-json-data-3677c6e7c9bc
* Making queries to multiple database tables simultaneously, and displaying the information on screen
* Use the Unsplash Source API + JavaScript to search and display an image based on the user's chosen country input


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


	* Check if email is unique (see above file + user.js)
	* [ ] hash password with bcrypt
	* [ ] insert into db
* [ ] Login user with POST /auth/login
	* [ ] check if email in db
		* [ ] compare password with hashed password in db
		* [ ] Set a cookie with user_id after creating user
			* [ ] Best Practices
			* [ ] Cross origin cookie!
* [ ] Create login form; show errors; redirect;
 	* [ ] validate required fields
* [ ] Create sign up form; show errors; redirect;
	* [ ] Validate required fields

#### Authorization:
* [ ] Visitors can only see the homepage
	* [ ] isLoggedIn middleware
		* [ ] user_id cookie must be set
		* [ ] send an unauthorized error message
	* [ ] redirect to login form
* [ ] Logged in users can only see their page
	* [ ] allowAccess middleware
		* [ ] id in url must match user_id in cookie
 		* [ ] send an unauthorized error message
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
