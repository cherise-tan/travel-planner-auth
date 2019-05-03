// jshint esversion:6

exports.up = function(knex, Promise) {
  return knex.schema.createTable("destinations", table => {
    table.increments("id").primary();
    // images
    table.string("imageUrl");
    table.string("imageId");
    table.string("city");
    table.string("country");
    // arrival information
    table.string("fromCity");
    table.string("fromCountry");
    table.string("inboundDepartureDate");
    table.string("inboundDepartureTime");
    table.string("inboundTransport");
    table.string("inboundArrivalDate");
    table.string("inboundArrivalTime");
    // departure information
    table.string("toCity");
    table.string("toCountry");
    table.string("outboundDepartureDate");
    table.string("outboundDepartureTime");
    table.string("outboundTransport");
    table.string("outboundArrivalDate");
    table.string("outboundArrivalTime");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("destinations");
};

// This file is the migrations, it tells the database hey we have a table you need to create, please add a table named drugs with
// the specified columns (including id (unique))

// if we roll back the migration (exports.down) then it will delete the table

// think of this as a saved checkpoint in a game, you can always fail and go back safely or continue forward
