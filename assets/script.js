const form = document.querySelector("form");

// Form submit event listener'ı ekleyelim
form.addEventListener("submit", (event) => {
  event.preventDefault();// Sayfanın yenilenmesini engelleyelim

  // Formdaki alanları alalım
  const image_url = document.getElementById("image_url").value;
  const average_rating_rounded = document.getElementById("average_rating_rounded").value;
  const books_count = document.getElementById("books_count").value;
  const original_title = document.getElementById("original_title").value;
  const image_medium_url = document.getElementById("image_medium_url").value;
  const isbn = document.getElementById("isbn").value;
  const average_rating = document.getElementById("average_rating").value;
  const original_publication_year = document.getElementById("original_publication_year").value;
  const title = document.getElementById("title").value;
  const language_code = document.getElementById("language_code").value;
  const id = document.getElementById("id").value;
  const ratings_count = document.getElementById("ratings_count").value;
  const original_series = document.getElementById("original_series").value;
  const authors = document.getElementById("authors").value;

  // Kitap önizlemesi için gerekli HTML kodunu oluşturalım
  const bookPreviewHTML = `
    <div class="book-preview">
      <img src="${image_url}" alt="${original_title}" width="150">
      <div>
        <h2>${title}</h2>
        <h3>${authors}</h3>
        <p>ISBN: ${isbn}</p>
        <p>Average Rating: ${average_rating}</p>
        <p>Original Publication Year: ${original_publication_year}</p>
      </div>
    </div>
  `;

  // Kitap önizlemesi HTML kodunu sayfaya ekleyelim
  document.body.insertAdjacentHTML("beforeend", bookPreviewHTML);

  const formData = new FormData(form);
  const formObject = Object.fromEntries(formData.entries());

  fetch("http://localhost:3008/addBook", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formObject),
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
});



  
