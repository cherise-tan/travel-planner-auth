# travel-planner
A trip planner for my future travels

## Planning
### Database
* Image
* Country name
* Currency
* Dates
* Arrival information
* Departure information
* Accommodation
* Things to do

### API ideas
* Maps
* Weather
* Currency conversion

## Learning

## Challenges to complete
### Handlebars
* Use handlebars to create a main template which can render many page layouts (e.g. the 'add' and 'delete' pages)
* For inspiration, view the views folder here: https://github.com/leslie-alldridge/hbs-practice
* Note: the {{{body}}} tells handlebars to implant the current view into the html body. 
* Note: the default layout configuration requires you to add something in server.js file to set up the middleware set up for handlebars (see the above repo) 

#### Add images/URLs
* Use {{these things}} inside html - E.g. ``` <img src="/pictures/{{id}}"/> ``` to render a specific picture on a page for each object
* Practice the above with images and links 

### Dropdowns to select what database object to delete/update etc
* The dropdowns will fix the most apparent bugs because it will force the user to choose out of what's available 
* Otherwise can consider using the ID to select these objects (ID's are a primary key in the database, whereas names are not)
* Note: the data object from the database contains ids so you can type {{id}} into the html to use it.

### Styling
* Add styling to the website
