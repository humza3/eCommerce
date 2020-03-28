const confName = document.getElementById('conf-title');
const confImg = document.getElementById('conf-img');
const confPrice = document.getElementById('conf-price');
const confTitle = document.getElementById('confirmation');
const confCard = document.getElementById('conf-card');
const x = window.location.hash.substr(1);
const URL = 'http://localhost:3000/api/cameras/' + x;

if (x === "") {
	confTitle.textContent = 'You have not Purchased an item';
	confCard.remove();
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
		confName.textContent = 'Name Not Found!';
		confImg.src = 'images/vcam_1.jpg';	  
		confPrice.textContent = 'Price Not Found!';
	  
    }
	const response = JSON.parse(apiRequest.response);	
		confName.textContent = response.name; 
		confPrice.textContent = "Price: £" + response.price;
		confImg.src = response.imageUrl;	 
  }
};
}