const cartName = document.getElementsByClassName('cart-name');
const cartImg = document.getElementsByClassName('cart-img');
const cartPrice = document.getElementsByClassName('cart-price');
const cartLens = document.getElementsByClassName('lenses');
const cartSubmit = document.getElementById('cart-submit');
const cartTitle = document.getElementById('title');
const cartCard = document.getElementById('card');
const cartProductArea = document.getElementById('main-product-area');
const cartForm = document.getElementById('form_1');
const firstNameInput = document.getElementById('firstName');
const lastNameInput = document.getElementById('lastName');
const addressInput = document.getElementById('address');
const cityInput = document.getElementById('city');
const emailInput = document.getElementById('email');
const URL = 'http://localhost:3000/api/cameras/';
//creating a constant for the local storage array
const items = localStorage;
const numberOfItems = items.length;

function financial(y) {
	let price= y/100;
	return parseFloat(price).toFixed(2);	
}


//checking to see if there are any items in local storage
if (numberOfItems === 0) {
	cartTitle.textContent = 'There are no items in your cart';
	cartProductArea.remove();
	cartForm.remove();
} else {
	
	for (let k in Object.entries(localStorage)){	
		let clone = cartCard.cloneNode(true);
		let productId = localStorage.key(k);
		clone.setAttribute('id', productId);
		cartProductArea.appendChild( clone );
		cartCard.remove();
	
		//if theere are items in local storag then display 
		cartTitle.textContent = 'Items in your cart:';	
	
		// Prepare XML request
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
					for(i = 0; i < numberOfItems; i++) {
					cartName[i].textContent = 'Name Not Found!';
					cartImg[i].src = 'images/vcam_1.jpg';	  
					cartPrice[i].textContent = 'Price Not Found!';
					}
					cartSubmit.href = 'confirmation.html';
				} 			
				const response = JSON.parse(apiRequest.response);				
				for(let l = 0; l < response.length; l++){ 
					if(response[l]._id == localStorage.getItem(localStorage.key(k))){
					cartName[l].textContent = response[l].name;	
					cartImg[l].src = response[l].imageUrl;
					for (let j = 0; j < response[l].lenses.length; j++) {
						let lens = document.createElement("option");
						lens.textContent = response[l].lenses[j];
						cartPrice[l].textContent = "Price: " + response[l].price;						
						lens.value = response[l].lenses[j];
						cartLens[l].appendChild(lens);
						}
					}
				}			
			}				
		};
	}
} 


/*
cartSubmit.addEventListener('click', ($event) => {
  $event.preventDefault();
  const postData = {
	
    firstName: firstNameInput.value,
    lastName: lastNameInput.value,
	address: addressInput.value,
	city: cityInput.value,
	email: emailInput.value
  };
  makeRequest(postData);
});

function makeRequest(data) {	
  return new Promise((resolve, reject) => {
	let apiRequest = new XMLHttpRequest();	
    apiRequest.open('POST', URL + '/order');
    apiRequest.onreadystatechange = () => {
      if (apiRequest.readyState === 4) {
        if (apiRequest.status === 201) {
			console.log(apiRequest.response);
			resolve(JSON.parse(apiRequest.response));		  
			cartForm.action = 'confirmation.html#' + JSON.parse(apiRequest.response)._id;
        } else {
			reject(JSON.parse(apiRequest.response));		  
			console.log("im rejected");
        }
      }
    };	
    apiRequest.setRequestHeader('Content-Type', 'application/json');
    apiRequest.send(JSON.stringify(data));
  });
} */