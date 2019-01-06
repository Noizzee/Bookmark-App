// Caching the DOM
let userInputW = document.querySelector('#website');
let userInputU = document.querySelector('#url');
const submitBtn = document.querySelector('#submitBtn');
const tableBody = document.querySelector('#url-list');

//Custom Variables
let isInputLength //Boolean to check if something is entered
let isValidURL //Boolean to check if user entered a valid URL
let bookMarks = []; //Array to keep all the bookmarks
//Integrating local storage
localStorage.setItem('bookmark', JSON.stringify(bookMarks));
const localData = JSON.parse(localStorage.getItem('bookmark'));
localData.forEach(item => {
  createBookmark(item);
});
let howMany = 0; //Keep track how many bookmarks are in the list

//Checking of something is entered in the inputfields
const check = () => {
  if (userInputW.value.length > Number(0) && userInputU.value.length > Number(0)) {
    return inputLength = true;
  } else {
    return inputLength = false;
  }
};

//Check if user entered a url
const validURL = (string) => {
  regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
  if (regexp.test(string)) {
    return isValidURL = true;
  } else {
    return isValidURL = false;
  }
};

//Function to create all the elements and display them in the UI
const createBookmark = () => {
  let trElement = document.createElement('tr');
  let tdElement = document.createElement('td');
  let tdElement2 = document.createElement('td');
  let tdElement3 = document.createElement('td');
  let deleteBtn = document.createElement('button');
  tdElement.appendChild(document.createTextNode(bookMarks[howMany].Website));
  tdElement2.appendChild(document.createTextNode(bookMarks[howMany].URL));
  deleteBtn.appendChild(document.createTextNode("X"));
  deleteBtn.className = 'btn btn-danger btn-sm';
  tdElement3.appendChild(deleteBtn);
  trElement.appendChild(tdElement);
  tdElement.parentElement.appendChild(tdElement2);
  tdElement.parentElement.appendChild(tdElement3);
  tableBody.appendChild(trElement);
  howMany++;
};

//Function to delete a bookmark
const deleteBookmark = (event) => {
  let deleteButtons = document.querySelectorAll('.btn-danger');
  deleteButtons.forEach(e => {
    if (event.target === e) { //e = the clicked button element
      tableBody.removeChild(e.parentElement.parentElement); //is the tr element, after the button you have td first and then tr
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
    createBookmark();
    userInputW.value = "";
    userInputU.value = "";
    let deleteBtn = document.querySelectorAll('.btn-danger');
    deleteBtn.forEach(special => {
      special.addEventListener('click', deleteBookmark);
    });
  }
});