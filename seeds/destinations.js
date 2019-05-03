exports.seed = function(knex, Promise) {
  return knex('destinations')
    .del()   // first deletes ALL existing entries
    .then(function() { // then inserts seed entries
      return knex("destinations").insert([
        // we are inserting an array of objects here
        { id: 1, imgurl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Westerkerk_Amsterdam.jpg/220px-Westerkerk_Amsterdam.jpg",
        imgid: 1, city: "Amsterdam", country: "Netherlands", arrcity: "Wellington", arrcountry: "New Zealand", arrdeptdate: "7 June 2019",
        arrdepttime: "16:45", arrtransport: "plane", arrarrdate: "8 June 2019", arrarrtime: "11:50", deptcity: "Bocholt", deptcountry: "Germany",
        deptdeptdate: "9 June 2019", deptdepttime: "18:15", depttransport: "bus", deptarrdate: "9 June 2019", deptarrtime: "20:15"},

        { id: 2, imgurl: "https://media-cdn.tripadvisor.com/media/photo-s/05/4a/d9/38/stadtwald-bocholt.jpg",
        imgid: 2, city: "Bocholt", country: "Germany", arrcity: "Amsterdam", arrcountry: "Netherlands", arrdeptdate: "9 June 2019",
        arrdepttime: "18:15", arrtransport: "bus", arrarrdate: "9 June 2019", arrarrtime: "20:15", deptcity: "Dusseldorf", deptcountry: "Germany",
        deptdeptdate: "13 June 2019", deptdepttime: "xx:xx", depttransport: "car", deptarrdate: "13 June 2019", deptarrtime: "xx:xx"}
      ]);
    });
};
