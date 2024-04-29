const url = `https://www.googleapis.com/books/v1/volumes?q=search+terms`;

const search = document.querySelector(".search");
const searchBtn = document.querySelector(".searchBtn");

const div = document.getElementById("div1");

let bookDiv = "";
let bookDetails = "";

// Fetch the books from api
const fetchBooks = async () => {
  try {
    const response = await fetch(url);
    const { items } = await response.json();
    items.forEach((book) => {
      bookDiv += `<div class="book">
                    <img class="book-picture" src="${book.volumeInfo.imageLinks.smallThumbnail}" />
                    <p class="title">${book.volumeInfo.title}</p>
                    <form action="/more">
                      <button class="read-more-button" type = "submit" id=${book.id} onclick="more(${book.id})">More &rarr;</button>
                    </form>
                    </div>`;
    });
  } catch (error) {
    console.error({ error });
  }
  div.innerHTML = bookDiv;
};

//Search about character or word or specific title in books title
const searchMethod = async () => {
  try {
    const response = await fetch(url);
    const { items } = await response.json();
    bookDiv = "";
    items.forEach((book) => {
      // if the searched word match part of book title.
      if (
        book.volumeInfo.title
          .toLowerCase()
          .search(search.value.toLowerCase()) != -1
      ) {
        bookDiv += `<div class="book" >
                    <img class="book-picture" src="${book.volumeInfo.imageLinks.smallThumbnail}" />
                    <p class="title">${book.volumeInfo.title}</p>
                    <form action="/more">
                    <button class="read-more-button" type = "submit" id=${book.id} onclick="more(${book.id})">More &rarr;</button>
                    </form>
                  </div>`;
      }
    });
  } catch (error) {
    console.error({ error });
  }

  if (bookDiv != "") {
    div.innerHTML = bookDiv;
  } else {
    div.innerHTML = `<p class="title" style = "height:300px !important">Sorry, There is no book with this title.</p>`;
  }
};

// function calling to fetch the book from api
fetchBooks();

// when you search about title in text field
searchBtn.addEventListener("click", searchMethod);

// button to go to book to read it
const more = (id) => {
  localStorage.setItem("bookid", id.id);
  window.location.replace("http://127.0.0.1:5000/more");
};
