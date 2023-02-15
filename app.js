const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const PORT = process.env.PORT || 3008;

// middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.use(express.static("assets"));
app.use(express.static("Data"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/addBook", (req, res) => {
  const book = {
    id: req.body.id,
    title: req.body.title,
    original_title: req.body.original_title,
    isbn: req.body.isbn,
    average_rating: req.body.average_rating,
    average_rating_rounded: req.body.average_rating_rounded,
    ratings_count: req.body.ratings_count,
    image_url: req.body.image_url,
    image_medium_url: req.body.image_medium_url,
    original_publication_year: req.body.original_publication_year,
    books_count: req.body.books_count,
    language_code: req.body.language_code,
    original_series: req.body.original_series,
    authors: req.body.authors,
    _id: "",
  };

  console.log("Yeni kitap:", book);
  console.log("Kitap adı:", book.title);
  console.log("Kitap yazarları:", book.authors);
  console.log("ISBN:", book.isbn);

  // Dosya yolu
  const filePath = path.join(__dirname, "Data", "data_good-books-ds__doc_0_10050.json");

  // Kitap listesini dosyadan oku
  const booksData = JSON.parse(fs.readFileSync(filePath));

  // Yeni kitabı kitap listesine ekle
  booksData.push(book);

  // Dosyaya yeni kitapları yaz
  fs.writeFileSync(filePath, JSON.stringify(booksData));

  // İstemciye yanıt ver
  res.send("Form verileri alındı ve kitap eklendi.");
});

app.listen(PORT, () =>
  console.log(`Sunucu ${PORT} portunda çalışıyor... http://localhost:${PORT}`)
);
