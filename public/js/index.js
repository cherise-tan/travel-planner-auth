function findImage() {
  var country = document.getElementById("Country");
  var imageUrl = document.getElementById("ImageUrl");

  var baseUrl = "https://source.unsplash.com/weekly?";

  var countryValue = country.value;

  var imageUrlValue = countryValue;

  imageUrl.value = baseUrl + imageUrlValue;
}
