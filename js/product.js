const cartButton = document.getElementById('cart-button');
const prodName = document.getElementById('prod-title');
const prodImg = document.getElementById('prod-img');
const prodPrice = document.getElementById('prod-price');
const prodDesc = document.getElementById('prod-desc');
const prodLens = document.getElementById('prod-lens');
const prodId = document.getElementById('prod-id');
const prodBody = document.getElementById('prod-body');
const items = Object.entries(localStorage);
const numberOfItems = items.length;
if(numberOfItems != 0) {
	cartButton.textContent = "(" + numberOfItems + ") Cart";
}


//take query parameter id to help display product
function queryString(obj) {  
    const result = [];
    let match;
    const re = new RegExp('(?:\\?|&)' + obj + '=(.*?)(?=&|$)', 'gi');
    while ((match = re.exec(document.location.search)) !== null) {
        result.push(match[1]);
    }
    return result;
}
function financial(y) {
	let price= y/100;
	return parseFloat(price).toFixed(2);	
}

const x = queryString("id")[0];
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
		  
		}
			const response = JSON.parse(apiRequest.response);	
			prodName.textContent = response.name; 
			prodPrice.textContent = "Price: £" + financial(response.price);
			prodDesc.textContent = response.description;
			prodLens.textContent = response.lenses;
			prodId.href = 'product.html?id=' + response._id;	
			prodImg.src = response.imageUrl;	 
		}
	};
}

prodId.addEventListener('click', ($event) => {
	localStorage.setItem(x,x);
});