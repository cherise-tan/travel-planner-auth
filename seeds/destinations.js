exports.seed = function(knex, Promise) {
  return knex('destinations')
    .del()   // first deletes ALL existing entries
    .then(function() { // then inserts seed entries
      return knex("destinations").insert([
        // we are inserting an array of objects here
        { id: 1, imgurl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Westerkerk_Amsterdam.jpg/220px-Westerkerk_Amsterdam.jpg",
        imgid: 1, city: "Amsterdam", country: "Netherlands", arrcity: "Wellington", arrcountry: "New Zealand", arrdeptdate: "19-06-07",
        arrdepttime: "16:45:00", arrtransport: "plane", arrarrdate: "19-06-08", arrarrtime: "11:50:00", deptcity: "Bocholt", deptcountry: "Germany",
        deptdeptdate: "19-06-09", deptdepttime: "18:15:00", depttransport: "bus", deptarrdate: "19-06-09", deptarrtime: "20:15:00"},
      ]);
    });
};
