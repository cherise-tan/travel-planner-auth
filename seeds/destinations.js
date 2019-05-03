exports.seed = function(knex, Promise) {
  return knex('destinations')
    .del()   // first deletes ALL existing entries
    .then(function() { // then inserts seed entries
      return knex("destinations").insert([
        // we are inserting an array of objects here
        { id: 1, imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Westerkerk_Amsterdam.jpg/220px-Westerkerk_Amsterdam.jpg",
        imageId: 1, city: "Amsterdam", country: "Netherlands", fromCity: "Wellington", fromCountry: "New Zealand", inboundDepartureDate: "7 June 2019",
        inboundDepartureTime: "16:45", inboundTransport: "plane", inboundArrivalDate: "8 June 2019", inboundArrivalTime: "11:50", toCity: "Bocholt",
        toCountry: "Germany", outboundDepartureDate: "9 June 2019", outboundDepartureTime: "18:15", outboundTransport: "bus",
        outboundArrivalDate: "9 June 2019", outboundArrivalTime: "20:15"},

        { id: 2, imageUrl: "https://media-cdn.tripadvisor.com/media/photo-s/05/4a/d9/38/stadtwald-bocholt.jpg",
        imageId: 2, city: "Bocholt", country: "Germany", fromCity: "Amsterdam", fromCountry: "Netherlands", inboundDepartureDate: "9 June 2019",
        inboundDepartureTime: "18:15", inboundTransport: "bus", inboundArrivalDate: "9 June 2019", inboundArrivalTime: "20:15", toCity: "Dusseldorf",
        toCountry: "Germany", outboundDepartureDate: "13 June 2019", outboundDepartureTime: "00:00", outboundTransport: "car",
        outboundArrivalDate: "13 June 2019", outboundArrivalTime: "00:00"}
      ]);
    });
};
