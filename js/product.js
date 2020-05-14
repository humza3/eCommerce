const serverError = document.getElementById('serverError');
const cartButton = document.getElementById('cart-button');
const prodName = document.getElementById('prod-title');
const prodImg = document.getElementById('prod-img');
const prodPrice = document.getElementById('prod-price');
const prodDesc = document.getElementById('prod-desc');
const prodLens = document.getElementById('prod-lens');
const prodId = document.getElementById('prod-id');
const prodBody = document.getElementById('prod-body');
const error = document.getElementById('error');
const items = Object.entries(localStorage);
const numberOfItems = items.length;
// disply the number of items placed inside the cart, if there are more items than 0
if(numberOfItems != 0) {
	cartButton.textContent = "(" + numberOfItems + ") Cart";
}


//take query parameter id from url address bar to help display product
function queryString(obj) {  
    const result = [];
    let match;
    const re = new RegExp('(?:\\?|&)' + obj + '=(.*?)(?=&|$)', 'gi');
    while ((match = re.exec(document.location.search)) !== null) {
        result.push(match[1]);
    }
    return result;
}
//display price correctly by dividing by 100 displaying it with two decimal points 
function financial(y) {
	let price= y/100;
	return parseFloat(price).toFixed(2);	
}
//create url to use for API request
const x = queryString("id")[0];
const URL = 'http://localhost:3000/api/cameras/' + x;

if (x === "") {
	//test to see if there is an actual product id in the url if not then state error page with no product chosen message
	prodName.textContent = 'You have not chosen a product';
	prodImg.remove();
	prodBody.remove();
} else {
	// Prepare API request
	let apiRequest = new XMLHttpRequest();
	/* 
	 * Capture and handle form submit event
	 * Prevent default behaviour, prepare and send API request
	*/
	  apiRequest.open('GET', URL);
	  apiRequest.send();

	apiRequest.onreadystatechange = () => {
	  if(apiRequest.readyState === 4) {
		if(apiRequest.status === 200 || apiRequest.status === 201) {			
			//if request is successful then the object displaying the name, desription etc in to its own div elementen proceed to loop through all the products 
			//check to see if id is a string
			if (typeof x === 'string') {
				const response = JSON.parse(apiRequest.response);			
				serverError.innerHTML = "";
				prodName.textContent = response.name; 
				prodPrice.textContent = "Price: $" + financial(response.price);
				prodDesc.textContent = response.description;
				//create loop to display the lenses in a option element
				for(let i = 0; i < response.lenses.length; i++) {
						const lens = document.createElement("option");
						lens.textContent = response.lenses[i];					
							prodLens.appendChild(lens);
					lens.value = response.lenses[i];
				}
				prodId.href = 'product.html?id=' + response._id;	
				prodImg.src = response.imageUrl;	
			} else {
				serverError.innerHTML = "There is a problem with the server's response, please contact the administrator on orinoco@example.com";
				prodName.textContent = 'Name Not Found!';
				prodImg.src = 'images/vcam_1.jpg';	  
				prodPrice.textContent = 'Price Not Found!';
				prodDesc.textContent = 'Description Not Found!';
				prodLens.textContent = 'Lenses Not Found!';
				
			}		
		} else {
			//if request unsuccessful than display default text and images and error header
			serverError.innerHTML = "There is a problem with the server's response, please refresh your page";
			prodName.textContent = 'Name Not Found!';
			prodImg.src = 'images/vcam_1.jpg';	  
			prodPrice.textContent = 'Price Not Found!';
			prodDesc.textContent = 'Description Not Found!';
			prodLens.textContent = 'Lenses Not Found!';
		
		}		
		}
	};
}
//once buy button is clicked the item and chosen lens is stored in local storage 
prodId.addEventListener('click', ($event) => {
	//checking to see if item already exists in the cart
	if(x in localStorage){
		//error message if items exists already
		$event.preventDefault();
		error.innerHTML = "* This Item Is Already In Your Cart *";
	}else {
		localStorage.setItem(x, prodLens.value);
	}
});