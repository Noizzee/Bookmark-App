// Caching the DOM
let userInputW = document.querySelector('#website');
let userInputU = document.querySelector('#url');
const submitBtn = document.querySelector('#submitBtn');
const tableBody = document.querySelector('#url-list');

//Custom Variables
let isInputLength //Boolean to check if something is entered
let bookMarks = []; //Array to keep all the bookmarks

const check = () => {
  if (userInputW.value.length > Number(0) && userInputU.value.length > Number(0)) {
    return inputLength = true;
  } else {
    return inputLength = false;
  }
};

const createBookmark = () => {
  let trElement = document.createElement('tr');
  let tdElement = document.createElement('td');
  tdElement.appendChild(document.createTextNode(userInputW.value));
  trElement.appendChild(tdElement);
  tableBody.appendChild(trElement);
};

// Event listeners
submitBtn.addEventListener('click', (event) => {
  event.preventDefault();
  check();
  if (inputLength) {
    bookMarks.push({
      Website: userInputW.value,
      URL: userInputU.value
    });
    window.localStorage.setItem('bookmarks', JSON.stringify(bookMarks[0]));
    createBookmark();
  }
});