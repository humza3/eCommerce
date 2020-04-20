const confName = document.getElementById('conf-title');
const confImg = document.getElementById('conf-img');
const confPrice = document.getElementById('conf-price');
const confTitle = document.getElementById('confirmation');
const confCard = document.getElementById('conf-card');
const x = window.location.hash.substr(1);
const URL = 'http://localhost:3000/api/cameras/' + x;

if (x === "") {
	//if id is not detetected then display error page that no item is detected 
	confTitle.textContent = 'You have not Purchased an item';
	confCard.remove();
} else {
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
const orderNumber = queryString("id")[0];
//once order is completed localstorage is cleared of its items
localStorage.clear();
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
    if(apiRequest.status = 404) {
		//if request unsuccessful than display default text and images
		confName.textContent = 'Name Not Found!';
		confImg.src = 'images/vcam_1.jpg';	  
		confPrice.textContent = 'Price Not Found!';
	  
    }
	const response = JSON.parse(apiRequest.response);
//if request is successful then display confirmation of purchased items	
		confName.textContent = response.name; 
		confPrice.textContent = "Price: £" + response.price;
		confImg.src = response.imageUrl;	 
  }
};
}