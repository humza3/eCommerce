const cartName = document.getElementsByClassName('cart-title');
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


//checking to see if there are any items in local storage
if (numberOfItems === 0) {
	cartTitle.textContent = 'There are no items in your cart';
	cartCard.remove();
	cartForm.remove();
} else {
	for (let i = 1; i < numberOfItems; i++){
		let clone = cartCard.cloneNode(true);
		clone.setAttribute('id', 'card' + i);
		cartProductArea.appendChild( clone );
	}
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
				for(let i = 0; i < cartImg.length; i++){
				cartName[i].textContent = 'Name Not Found!';
				cartImg[i].src = 'images/vcam_1.jpg';	  
				cartPrice[i].textContent = 'Price Not Found!';
				}
				cartSubmit.href = 'confirmation.html';
			} 
			const response = JSON.parse(apiRequest.response);	
			for (let i in response){	
console.log(i);
console.log(response);			
					let itemsInCart = localStorage.getItem(response[i]._id);
					console.log(itemsInCart);
					if(response[i]._id == itemsInCart){
						console.log(cartName[i]);
						//cartName[i].textContent = response[i].name;	
						//cartPrice[i].textContent = "Price: " + response[i].price;						
						cartImg[i].src = response[i].imageUrl;
						for (let j = 0; j < response[i].lenses.length; j++) {
							let lens = document.createElement("option");
							lens.textContent = response[i].lenses[j];
							lens.value = response[i].lenses[j];
							cartLens[i].appendChild(lens);
						}
					} 
			}			
		}				
	};
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