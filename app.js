// Caching the DOM
let userInputW = document.querySelector('#website');
let userInputU = document.querySelector('#url');
const submitBtn = document.querySelector('#submitBtn');
const tableBody = document.querySelector('#url-list');
const searchBar = document.querySelector('#searchBox');

//Custom Variables
let isInputLength //Boolean to check if something is entered
let isValidURL //Boolean to check if user entered a valid URL

//Integrating local storage
//Checks if there is a key in localstorage with the name bookmark, yes? getItem no? create empy array
let bookMarks = localStorage.getItem('bookmark') ? JSON.parse(localStorage.getItem('bookmark')) : [];
localStorage.setItem('bookmark', JSON.stringify(bookMarks));

//Checking of something is entered in the inputfields
const check = () => {
  if (userInputW.value.length > Number(0) && userInputU.value.length > Number(0)) {
    return inputLength = true;
  } else {
    return inputLength = false;
  }
};

//Check if user entered a url
const validURL = (URL) => {
  regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
  if (regexp.test(URL)) {
    return isValidURL = true;
  } else {
    return isValidURL = false;
  }
};

//Function to create all the elements and display them in the UI
const createBookmark = (input, input2) => { //accepts 2 parameters
  let trElement = document.createElement('tr');
  let tdElement = document.createElement('td');
  let tdElement2 = document.createElement('td');
  let tdElement3 = document.createElement('td');
  let deleteBtn = document.createElement('button');
  let linkBtn = document.createElement('a');
  linkBtn.className = 'btn btn-primary btn-sm';
  linkBtn.setAttribute('href', `https://${input2}`);
  linkBtn.setAttribute('target', '_blank');
  linkBtn.innerHTML = `<i class="fas fa-globe"></i>`;
  tdElement3.appendChild(linkBtn);
  trElement.className = 'generateClass';
  tdElement.appendChild(document.createTextNode(input));
  tdElement2.appendChild(document.createTextNode(input2));
  deleteBtn.appendChild(document.createTextNode("X"));
  deleteBtn.className = 'btn btn-danger btn-sm';
  tdElement3.appendChild(deleteBtn);
  trElement.appendChild(tdElement);
  tdElement.parentElement.appendChild(tdElement2);
  tdElement.parentElement.appendChild(tdElement3);
  tableBody.appendChild(trElement);
};

//deleteBookmark function
const deleteBookmark = (event) => {
  let deleteButtons = document.querySelectorAll('.btn-danger');
  deleteButtons.forEach((e, index) => { //Index value of elements to be used to splice the array
    if (event.target === e) { //e = the clicked button element
      tableBody.removeChild(e.parentElement.parentElement); //is the tr element, after the button you have td first and then tr
      bookMarks.splice(index, 1);
      localStorage.setItem('bookmark', JSON.stringify(bookMarks));
    }
  });
};

//Alertmessage function
const showAlert = (message) => {
  const alertDiv = document.createElement('div');
  alertDiv.className = 'alert alert-warning';
  alertDiv.appendChild(document.createTextNode(message));
  const mForm = document.querySelector('#book-form-url');
  mForm.insertBefore(alertDiv, submitBtn);
  setTimeout(() => {
    document.querySelector('.alert').remove()
  }, 2000); //Removes the alertDiv after 2s
};

//Search function
const filterList = () => {
  let generateTR = document.querySelectorAll('.generateClass');
  let tdElements;
  let txtValue;
  generateTR.forEach((e) => {
    tdElements = e.querySelectorAll('td')[0];
    if (tdElements) {
      txtValue = tdElements.textContent;
      if (txtValue.toUpperCase().indexOf(searchBar.value.toUpperCase()) > -1) {
        e.style.display = "";
      } else {
        e.style.display = "none";
      }
    }
  });
};

// Submit button to add the bookmark
submitBtn.addEventListener('click', (event) => {
  event.preventDefault();
  check();
  validURL(userInputU.value);
  if (inputLength && isValidURL) {
    bookMarks.push({
      Website: userInputW.value,
      URL: userInputU.value
    }); //Push a new bookmark into the array
    localStorage.setItem('bookmark', JSON.stringify(bookMarks)); //Push the new array inside localstorage
    createBookmark(userInputW.value, userInputU.value);
    userInputW.value = "";
    userInputU.value = "";
    let deleteBtn = document.querySelectorAll('.btn-danger');
    deleteBtn.forEach(special => {
      special.addEventListener('click', deleteBookmark);
    });
  } else {
    showAlert("Please enter a valid URL and websitename!")
  }
});

// Search function on keyup
searchBar.addEventListener('keyup', filterList);

// Running the createBookmark function for every item inside localstorage to display them back on the screen when reload
window.addEventListener('load', (event) => {
  bookMarks.forEach(item => {
    createBookmark(item.Website, item.URL);
  });
  let deleteBtn = document.querySelectorAll('.btn-danger'); //Adding eventlistener to all deleteBtn on load
  deleteBtn.forEach(special => {
    special.addEventListener('click', deleteBookmark);
  });
});