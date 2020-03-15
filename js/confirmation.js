const confName = document.getElementById('conf-title');
const confImg = document.getElementById('conf-img');
const confPrice = document.getElementById('conf-price');
const URL = 'http://localhost:3000/api/cameras';

const i = window.location.hash.substr(1);
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
		confName.textContent = 'Name Not Found!';
		confImg.src = 'images/vcam_1.jpg';	  
		confPrice.textContent = 'Price Not Found!';
	  
    }
	const response = JSON.parse(apiRequest.response);	
		confName.textContent = response[i].name; 
		confPrice.textContent = "Price: £" + response[i].price;
		confImg.src = response[i].imageUrl;	 
  }
};