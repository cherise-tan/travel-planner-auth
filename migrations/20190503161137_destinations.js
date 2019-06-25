// Sets up the migrations -> tells the database what tables to create, including associations between them
exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable("users", (table) => { // Create the 'users' table
      table.increments("userId").primary(); // Sets up the primary id which will auto-increment
      table.string("name").notNullable();
      table.string("email").notNullable();
      table.string("password").notNullable();
      table.timestamp("createdAt").defaultTo(knex.fn.now());
    }),
    knex.schema.createTable("destinations", (table) => { // Create the 'destinations' table
      table.increments("destinationId").primary();
      // IMAGES/DESTINATION INFO
      table.string("imageUrl");
      table.string("city");
      table.string("country");
      // ARRIVAL INFO
      table.string("fromCity");
      table.string("fromCountry");
      table.string("inboundDepartureDate");
      table.string("inboundDepartureTime");
      table.string("inboundTransport");
      table.string("inboundArrivalDate");
      table.string("inboundArrivalTime");
      // DEPARTURE INFO
      table.string("toCity");
      table.string("toCountry");
      table.string("outboundDepartureDate");
      table.string("outboundDepartureTime");
      table.string("outboundTransport");
      table.string("outboundArrivalDate");
      table.string("outboundArrivalTime");
      // FOREIGN KEY
      table.integer("userId").unsigned()
      table.foreign("userId")
        .references("users.userId"); // Foreign key references the user id
    }),
    knex.schema.createTable("activities", (table) => { // Create the 'activities' table
      table.increments("activityId").primary();
      table.string("name");
      table.string("website");
      table.string("notes");
      table.integer("destinationId").unsigned()
      table.foreign("destinationId") // Sets up the foreign key
        .references("destinations.destinationId"); // Foreign key references the destination id
    }),
    knex.schema.createTable("accommodations", (table) => { // Create the 'accommodations' table
      table.increments("accommodationId").primary();
      table.string("name");
      table.string("address");
      table.string("website");
      table.string("notes");
      table.integer("destinationId").unsigned()
      table.foreign("destinationId") // Sets up the foreign key
        .references("destinations.destinationId"); // Foreign key references the destination id
    })
  ]);
};

// If we roll back the migration (exports.down), all tables will be deleted
exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable("activities"),
    knex.schema.dropTable("accommodations"),
    knex.schema.dropTable("destinations"),
    knex.schema.dropTable("users")
  ]);
};