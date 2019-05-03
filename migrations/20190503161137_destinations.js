// jshint esversion:6

exports.up = function(knex, Promise) {
  return knex.schema.createTable("destinations", table => {
    table.increments("id").primary();
    // images
    table.string("imgurl");
    table.string("imgid");
    table.string("city");
    table.string("country");
    // arrival information
    table.string("arrcity");
    table.string("arrcountry");
    table.string("arrdeptdate");
    table.string("arrdepttime");
    table.string("arrtransport");
    table.string("arrarrdate");
    table.string("arrarrtime");
    // departure information
    table.string("deptcity");
    table.string("deptcountry");
    table.string("deptdeptdate");
    table.string("deptdepttime");
    table.string("depttransport");
    table.string("deptarrdate");
    table.string("deptarrtime");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("destinations");
};

// This file is the migrations, it tells the database hey we have a table you need to create, please add a table named drugs with
// the specified columns (including id (unique))

// if we roll back the migration (exports.down) then it will delete the table

// think of this as a saved checkpoint in a game, you can always fail and go back safely or continue forward
