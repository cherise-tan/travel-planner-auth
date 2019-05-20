// This is called from the Add/Update destination page - uses Unsplash Source API to generate an image according to country
function findImage() {
  // Select the elements 'Country' and 'ImageURL'
  var country = document.getElementById("Country"); // get the country entered by the user and define it as 'country'
  var imageUrl = document.getElementById("ImageUrl"); // get the image-url object and define it as 'imageUrl'

  var baseUrl = "https://source.unsplash.com/weekly?"; // define the base of our url

  // Get the value of Country, and then set the imageURL to equal this value
  var countryValue = country.value;
  var imageUrlValue = countryValue;

  imageUrl.value = baseUrl + imageUrlValue; // set the 'value' of our imageUrl to be our base url + country name
}
