const prodName = document.getElementById('prod-title');
const prodImg = document.getElementById('prod-img');
const prodPrice = document.getElementById('prod-price');
const prodDesc = document.getElementById('prod-desc');
const prodLens = document.getElementById('prod-lens');
const prodId = document.getElementById('prod-id');
const prodBody = document.getElementById('prod-body');
const x = window.location.hash.substr(1);
const URL = 'http://localhost:3000/api/cameras/' + x;


if (x === "") {
	prodName.textContent = 'You have not chosen a product';
	prodImg.remove();
	prodBody.remove();
} else {
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
			prodName.textContent = 'Name Not Found!';
			prodImg.src = 'images/vcam_1.jpg';	  
			prodPrice.textContent = 'Price Not Found!';
			prodDesc.textContent = 'Description Not Found!';
			prodLens.textContent = 'Lenses Not Found!';
			prodId.href = 'cart.html';
		  
		}
			const response = JSON.parse(apiRequest.response);	
			prodName.textContent = response.name; 
			prodPrice.textContent = "Price: £" + response.price;
			prodDesc.textContent = response.description;
			prodLens.textContent = response.lenses;
			prodId.href = 'cart.html#' + response._id;	
			prodImg.src = response.imageUrl;	 
		}
	};
}

prodId.addEventListener('click', ($event) => {
	$event.preventDefault();
	localStorage.setItem(x,x);
});