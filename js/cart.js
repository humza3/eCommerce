const cartButton = document.getElementById('cart-button');
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
const items = Object.entries(localStorage);
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
	
	cartButton.textContent = "(" + numberOfItems + ") Cart";
	
	//making the product id the id attribute for the div were using
	cartCard.remove();
	for (let k in items){
		//duplicating the div dependent on how many items inside local storage
		let productId = localStorage.key(k);
		let newDiv = document.createElement("div");
		let newDivImgHolder = document.createElement("div");
		let newTextHolder = document.createElement("div");
		let newImg = document.createElement("img");
		let newH5Name = document.createElement("h5");
		let newH6Price = document.createElement("h6");
		let newLens = document.createElement("select");
		//making div which holds image and text of product
		newDiv.setAttribute('id', productId);
		newDiv.setAttribute('class', "card flex-row flex-wrap");	
		cartProductArea.appendChild( newDiv );
		//making div which holds image of product
		newDivImgHolder.setAttribute('class', "card-header border-0");
		newDiv.appendChild(newDivImgHolder);
		newImg.setAttribute("id", "img" + productId);
		newImg.setAttribute("class", "img" + productId);
		newImg.setAttribute("height", "100");
		newDivImgHolder.appendChild(newImg);		
		//making div which holds text of product
		newTextHolder.setAttribute('class', "card-block px-2");
		newDiv.appendChild(newTextHolder);
		newH5Name.setAttribute('id', "name" + productId);
		newH5Name.setAttribute('class', "name" + productId);
		newTextHolder.appendChild(newH5Name);
		newH6Price.setAttribute('id', "price" + productId);
		newH6Price.setAttribute('class', "price" + productId);
		newTextHolder.appendChild(newH6Price);
		newLens.setAttribute('id', "lens" + productId);
		newLens.setAttribute('class', "lens" + productId);
		newTextHolder.appendChild(newLens);
		
		let cartName = document.getElementById("name" + productId);
		let cartPrice =  document.getElementById("price" + productId);
		let cartImg =  document.getElementById("img" + productId);
		let cartLens =  document.getElementById("lens" + productId);		
		//if theere are items in local storag then display 
		if(numberOfItems === 1) {
			cartTitle.textContent = 'There is a Camera in your cart:';	
		} else {
			cartTitle.textContent = 'There are ' + numberOfItems + ' Cameras in your cart:';	
		}
		
		// Prepare XML request
		let apiRequest = new XMLHttpRequest();

		/* 
		* Capture and handle form submit event
		* Prevent default behaviour, prepare and send API request
		*/
		apiRequest.open('GET', URL + productId);
		apiRequest.send();

		apiRequest.onreadystatechange = () => {
			if(apiRequest.readyState === 4) {	
				if(apiRequest.status = 404) {
					cartName.textContent = 'Name Not Found!';
					cartImg.src = 'images/vcam_1.jpg';	  
					cartPrice.textContent = 'Price Not Found!';
					cartSubmit.href = 'confirmation.html';
				} 			
				const response = JSON.parse(apiRequest.response);
				cartName.textContent = response.name;
				cartPrice.textContent = response.price;
				cartImg.src = response.imageUrl;
				for(let i = 0; i < response.lenses.length; i++) {
					let lens = document.createElement("option");
					lens.textContent = response.lenses[i];					
					lens.value = response.lenses[i];
					cartLens.appendChild(lens);
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