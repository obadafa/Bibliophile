const url = `https://www.googleapis.com/books/v1/volumes?q=search+terms`;
const goBack = document.querySelector(".go-back-Btn");

const selectedBook = localStorage.getItem("bookid");
const bookPic = document.getElementById("bookPic");
const information = document.getElementById("information");

let bookDiv = "";

goBack.addEventListener("click", () => {
  window.location.replace("http://127.0.0.1:5000/templates/book-viewer");
});

const fetchBook = async () => {
  try {
    const response = await fetch(url);
    const { items } = await response.json();
    items.forEach((book) => {
      if (selectedBook == book.id) {
        bookDiv = book;
      }
    });
  } catch (error) {
    console.error({ error });
  }

  bookPic.innerHTML = `<img class="book-picture" src="${bookDiv.volumeInfo.imageLinks.smallThumbnail}" />`;
  information.innerHTML = `<h5 class="title"> ${bookDiv.volumeInfo.description}</h5>
                          <a class="btn btn-success" href="${bookDiv.volumeInfo.previewLink}" target="_blank">
                            <button class="read-btn">Read</button>
                          </a>`;
};

fetchBook();
