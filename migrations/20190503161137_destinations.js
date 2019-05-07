// jshint esversion:6

// Sets up the migrations -> tells the database what tables it needs to create, including association between different tables

exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable("destinations", (table) => { // create the 'destinations' table
      table.increments("id").primary(); // sets up the primary id which will auto-increment
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
    }),
    knex.schema.createTable("activities", (table) => { // create the activities table
      table.increments("id").primary(); // sets up the primary id which will auto-increment
      table.string("name");
      table.string("website");
      table.string("notes");
      table.integer("destinationId").unsigned()
      table.foreign("destinationId") // sets up the foreign key
        .references("destinations.id"); // foreign key references the destinations id
    }),
    knex.schema.createTable("accommodations", (table) => { // create the accommodations table
      table.increments("id").primary(); // sets up the primary id which will auto-increment
      table.string("name");
      table.string("address");
      table.string("website");
      table.string("notes");
      table.integer("destinationId").unsigned()
      table.foreign("destinationId") // sets up the foreign key
      .references("destinatons.id"); // foreign key references the destinations id
    })
  ]);
};

// If we roll back the migration (exports.down), the tables will be deleted
exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable("destinations"),
    knex.schema.dropTable("activities"),
    knex.schema.dropTable("accommodations")
  ]);
};
