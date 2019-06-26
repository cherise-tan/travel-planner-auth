// This is called from the Add/Update destination page - uses Unsplash Source API to generate an image according to country
function findImage() {
  var country = document.getElementById("Country"); // Get the country entered by the user and define it as 'country'
  var imageUrl = document.getElementById("ImageUrl"); // Get the image-url object and define it as 'imageUrl'

  var baseUrl = "https://source.unsplash.com/weekly?"; // This forms the base of our URL

  // Get the value of Country, and then set the imageURL to equal this value
  var countryValue = country.value;
  var imageUrlValue = countryValue;

  if (imageUrlValue == "") {
    imageUrl.placeholder = "Please enter your destination country"
  } else {
    imageUrl.value = baseUrl + imageUrlValue; // set the 'value' of our imageUrl to be our base url + country name
  }
}