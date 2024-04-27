const url = `https://www.googleapis.com/books/v1/volumes?q=search+terms`;

const search = document.querySelector(".search");
const searchBtn = document.querySelector(".searchBtn");
const div = document.getElementById("div1");

let bookDiv = "";

// Fetch the books from api
const fetchBooks = async () => {
  try {
    const response = await fetch(url);
    const { items } = await response.json();
    items.forEach((book) => {
      bookDiv += `<div class="book">
                    <img class="book-picture" src="${book.volumeInfo.imageLinks.smallThumbnail}" />
                    <p class="title">${book.volumeInfo.title}</p>
                    <button class="reed-more-button">Rate &rarr;</button>
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
      if (
        book.volumeInfo.title
          .toLowerCase()
          .search(search.value.toLowerCase()) != -1
      ) {
        bookDiv += `<div class="book">
                    <img class="book-picture" src="${book.volumeInfo.imageLinks.smallThumbnail}" />
                    <p class="title">${book.volumeInfo.title}</p>
                    <button class="reed-more-button">Rate &rarr;</button>
                </div>`;
      }
    });
  } catch (error) {
    console.error({ error });
  }

  if (bookDiv != "") {
    div.innerHTML = bookDiv;
  } else {
    div.innerHTML = `<p class="title">Sorry, There is no book with this title.</p>`;
  }
};

fetchBooks();
searchBtn.addEventListener("click", searchMethod);
