//Create a Bookmark
class Bookmark {
  constructor(name, url) {
    this.name = name;
    this.url = url;
  }
}

//UI: Handles everything UI related
class UI {
  //Create and add the bookmark to the ui
  static addBookmark(bookmark) {
    //Grab the tbody to add to it
    const list = document.querySelector('#url-list');
    //Create tr element
    const tr = document.createElement('tr');
    //Add the userinput and the delete btn to the TR
    tr.innerHTML = `
    <td>${bookmark.name}</td>
    <td>${bookmark.url}</td>
    <td><a href="#" class="btn btn-danger btn-sm">X</a></td>
    `;
    //Add the tr to the tbody
    list.appendChild(tr);
  }

  //Remove a bookmark from the ui
  static deleteBookmark(element) {
    if (element.classList.contains("btn-danger")) {
      element.parentElement.parentElement.remove();
    }
  }
}

//Storage

//Event Submit
document.querySelector('#submitBtn').addEventListener('click', (e) => {
  //Prevent default action
  e.preventDefault();
  //Get user input
  const name = document.querySelector('#website').value;
  const url = document.querySelector('#url').value;
  //Create the bookmark
  const bookmark = new Bookmark(name, url);
  //Add the bookmark to the UI Method
  UI.addBookmark(bookmark);
});

//Delete Event
document.querySelector('#url-list').addEventListener('click', (e) => {
  //Call the deleteBookmark method and pass in the event target
  UI.deleteBookmark(e.target);
});