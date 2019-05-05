# travel-planner
A trip planner for my future travels

## Planning
### Database
* Image (need to work out how to upload image to database; need a default image if one is not provided)
* City name (required field)
* Country name (required field)
* Dates
* Arrival info
* Departure info

### Colour Palette
* https://colorhunt.co/palette/144191

### Future ideas
* DONE: "Accommodation" section (separate table in database) - due to potential one-to-many relationship
* DONE: "Activities" section (separate table in database) - due to one-to-many relationship
* Validation (e.g. validating city/country name are actual places, validating a url is a url, restricting dates (e.g. year))
* ?Google search to find an image of the city, rather than requiring the user to provide one themselves
* API integration: Maps, Weather
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

## Challenges to complete
### Handlebars (COMPLETED)
* Use handlebars to create a main template which can render many page layouts (e.g. the 'add' and 'delete' pages)
* For inspiration, view the views folder here: https://github.com/leslie-alldridge/hbs-practice
* Note: the {{{body}}} tells handlebars to implant the current view into the html body.
* Note: the default layout configuration requires you to add something in server.js file to set up the middleware set up for handlebars (see the above repo)

#### Add images/URLs (COMPLETED - with links)
* Use {{these things}} inside html - E.g. ``` <img src="/pictures/{{id}}"/> ``` to render a specific picture on a page for each object
* Practice the above with images and links

### Dropdowns to select what database object to delete/update etc (NOT REQUIRED)
* The dropdowns will fix the most apparent bugs because it will force the user to choose out of what's available
* Otherwise can consider using the ID to select these objects (ID's are a primary key in the database, whereas names are not)
* Note: the data object from the database contains ids so you can type {{id}} into the html to use it.

### Styling (COMPLETED)
* Add styling to the website
