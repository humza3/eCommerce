const cartName = document.getElementById('cart-title');
const cartImg = document.getElementById('cart-img');
const cartPrice = document.getElementById('cart-price');
const cartSubmit = document.getElementById('cart-submit');
const cartTitle = document.getElementById('title');
const cartCard = document.getElementById('card');
const cartForm = document.getElementById('form_1');
const firstNameInput = document.getElementById('firstName');
const lastNameInput = document.getElementById('lastName');
const addressInput = document.getElementById('address');
const cityInput = document.getElementById('city');
const emailInput = document.getElementById('email');
const x = window.location.hash.substr(1);
const URL = 'http://localhost:3000/api/cameras/' + x;


if (x === "") {
	console.log(x);
	cartTitle.textContent = 'There are no items in your cart';
	cartCard.remove();
	cartForm.remove();
} else {
	cartTitle.textContent = 'Items in your cart:';	
	
	// Prepare openweathermap.org request
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
		cartName.textContent = 'Name Not Found!';
		cartImg.src = 'images/vcam_1.jpg';	  
		cartPrice.textContent = 'Price Not Found!';
		cartSubmit.href = 'confirmation.html';
	  
	}
	let response = JSON.parse(apiRequest.response);	
	cartName.textContent = response.name; 
	cartPrice.textContent = "Price: £" + response.price;
	cartSubmit.href = 'confirmation.html#' + response._id;	
	cartImg.src = response.imageUrl;	 
	}
	};
}

cartSubmit.addEventListener('click', ($event) => {
  $event.preventDefault();
  const post = {
    firstName: firstNameInput.value,
    lastName: lastNameInput.value,
	address: addressInput.value,
	city: cityInput.value,
	email: emailInput.value
  };
});

function makeRequest(data) {
  return new Promise((resolve, reject) => {
    apiRequest.open('POST', URL + '/order');
    apiRequest.onreadystatechange = () => {
      if (apiRequest.readyState === 4) {
        if (apiRequest.status === 201) {
          resolve(response);
        } else {
          reject(response);
        }
      }
    };
	cartForm.action = 'confirmation.html#' + response._id;
    apiRequest.setRequestHeader('Content-Type', 'application/json');
    apiRequest.send(JSON.stringify(data));
  });
}