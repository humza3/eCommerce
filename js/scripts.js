const reportName = document.getElementById('card-title');
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
	console.log(reportName);
  if(apiRequest.readyState === 4) {
    if(apiRequest.status = 404) {
      reportName.textContent = 'Name Not Found!';
    }
    const response = JSON.parse(apiRequest.response);
    reportName.textContent = response[0].name;
	console.log(response);
  }
};