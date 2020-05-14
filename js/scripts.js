const serverError = document.getElementById('serverError');
const cartButton = document.getElementById('cart-button');
const reportName = document.getElementsByClassName('card-title');
const reportDesc = document.getElementsByClassName('card-text');
const reportLink = document.getElementsByClassName('card-link');
const reportImg = document.getElementsByClassName('card-img-top');
const URL = 'http://localhost:3000/api/cameras';
const items = Object.entries(localStorage);
const numberOfItems = items.length;
// disply the number of items placed inside the cart, if there are more items than 0
if(numberOfItems != 0) {
	cartButton.textContent = "(" + numberOfItems + ") Cart";
}

// Prepare the API reqquest
let apiRequest = new XMLHttpRequest();

/* 
 * Capture and handle form submit event
 * Prevent default behaviour, prepare and send API request
*/
  apiRequest.open('GET', URL);
  apiRequest.send();

apiRequest.onreadystatechange = () => {
  if(apiRequest.readyState === 4) {
    if(apiRequest.status = 404) {
		//if request unsuccessful than display default text and images and error header
		serverError.innerHTML = "There is a problem with the server's response, please refresh your page";
		reportName.textContent = 'Name Not Found!';
		reportDesc.textContent = 'Description Not Found!';
		reportLink.href = 'product.html';
		reportImg.src = 'images/vcam_1.jpg';	  
    }
	
    const response = JSON.parse(apiRequest.response);	
	
	serverError.innerHTML = "";
	//if request is successful then proceed to loop through all the products in the object displaying the name, desription etc in to its own div element
	for (var i = 0; i < response.length; i++) {			
		reportName[i].textContent = response[i].name;		
		reportDesc[i].textContent = response[i].description;
		reportLink[i].href = "product.html?id=" + response[i]._id;
		reportImg[i].src = response[i].imageUrl;
	}
	
  }
};