const reportName = document.getElementById('card-title');
const reportDesc = document.getElementById('card-desc');
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
    }
    const response = JSON.parse(apiRequest.response);
    reportName.textContent = response[0].name;
    reportDesc.textContent = response[0].description;
	console.log(response);
  }
};