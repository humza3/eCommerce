const reportName = document.getElementsByClassName('card-title');
const reportDesc = document.getElementsByClassName('card-text');
const reportLink = document.getElementsByClassName('card-link');

const URL = 'http://localhost:3000/api/cameras';

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
      reportName.textContent = 'Name Not Found!';
	  reportDesc.textContent = 'Description Not Found!';
	  reportLink.href = 'Page Not Found!';
	  
    }
    const response = JSON.parse(apiRequest.response);	
	for (var i = 0; i < response.length; i++) {
		reportName[i].textContent = response[i].name;		
		reportDesc[i].textContent = response[i].description;
		reportLink[i].href = "product.html&_id=" + response[i]._id;
	}
  }
};