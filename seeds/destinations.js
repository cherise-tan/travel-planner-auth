exports.seed = function(knex, Promise) {
  return knex('destinations')
    .del()   // first deletes ALL existing entries
    .then(function() { // then inserts seed entries
      return knex("destinations").insert([
        // we are inserting an array of objects here
        { id: 1, imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Westerkerk_Amsterdam.jpg/220px-Westerkerk_Amsterdam.jpg",
        imageId: 1, city: "Amsterdam", country: "Netherlands", fromCity: "Wellington", fromCountry: "New Zealand", inboundDepartureDate: "2019-06-07",
        inboundDepartureTime: "16:45", inboundTransport: "plane", inboundArrivalDate: "2019-06-08", inboundArrivalTime: "11:50", toCity: "Bocholt",
        toCountry: "Germany", outboundDepartureDate: "2019-06-09", outboundDepartureTime: "18:15", outboundTransport: "bus",
        outboundArrivalDate: "2019-06-09", outboundArrivalTime: "20:15"},

        { id: 2, imageUrl: "https://media-cdn.tripadvisor.com/media/photo-s/05/4a/d9/38/stadtwald-bocholt.jpg",
        imageId: 2, city: "Bocholt", country: "Germany", fromCity: "Amsterdam", fromCountry: "Netherlands", inboundDepartureDate: "2019-06-09",
        inboundDepartureTime: "18:15", inboundTransport: "bus", inboundArrivalDate: "2019-06-09", inboundArrivalTime: "20:15", toCity: "Dusseldorf",
        toCountry: "Germany", outboundDepartureDate: "2019-06-13", outboundDepartureTime: "00:00", outboundTransport: "car",
        outboundArrivalDate: "2019-06-13", outboundArrivalTime: "00:00"}
      ]);
    });
};
