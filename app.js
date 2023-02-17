const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const short = require("short-uuid");
const prettier = require("prettier");

const PORT = process.env.PORT || 3008;

// middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static("assets"));
app.use(express.static("Data"));
app.use(express.static("Page"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/removeBook", (req, res) => {
  // body-parser modülü ile gelen isteğin vücudundaki _id'ye erişin
  const id = req.body.id;
  console.log(`Received book ID to remove: ${id}`);
  

  // JSON verilerinin bulunduğu dosya
  const FILE_PATH = "./Data/data_good-books-ds__doc_0_10050.json";

  // JSON dosyasındaki verileri okuyun
  const books = JSON.parse(fs.readFileSync(FILE_PATH));

  // Verilerin _id özelliği ile eşleşen öğeyi bulun
  const index = books.findIndex((book) => book._id === id);

  if (index === -1) {
    // Eşleşen bir öğe bulunamadı
    res.send("Bu _id ile bir kitap bulunamadı.");
  } else {
    // Eşleşen öğe bulundu, listeden kaldırın ve dosyayı yeniden yazın
    books.splice(index, 1);
    fs.writeFileSync(
      FILE_PATH,
      prettier.format(JSON.stringify(books), { parser: "json" })
    );
    res.send(`The book with ID ${id} has been successfully removed.`);
  }
});

// // Kitapları silmek için endpoint
// app.get("/removeBook", (req, res) => {

//     const id = req.query.id;
//     console.log(`Received ID: ${id}`);
//     res.send(`Received ID: ${id}`);

// });

// Yeni bir kitap eklemek için endpoint
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
    _id: idCreator(),
  };

  console.log("Yeni kitap:", book);
  console.log("Kitap adı:", book.title);
  console.log("Kitap yazarları:", book.authors);
  console.log("ISBN:", book.isbn);

  // Dosya yolu
  const filePath = path.join(
    __dirname,
    "Data",
    "data_good-books-ds__doc_0_10050.json"
  );

  // Kitap listesini dosyadan oku
  const booksData = JSON.parse(fs.readFileSync(filePath));

  // Yeni kitabı kitap listesine ekle
  booksData.push(book);

  // Dosyaya yeni kitapları yaz
  fs.writeFileSync(
    filePath,
    prettier.format(JSON.stringify(booksData), { parser: "json" })
  );

  // İstemciye yanıt ver
  res.send("Form verileri alındı ve kitap eklendi.");
});

function idCreator() {
  const translator = short();
  let newId = "-" + translator.new();
  let data = require("./Data/data_good-books-ds__doc_0_10050.json");
  let idExists = true;

  while (idExists) {
    if (!data.some((item) => item._id === newId)) {
      idExists = false;
      break;
    }
    newId = "-" + translator.new();
  }

  // "-" karakterini çıkar
  newId = newId.substring(1);

  // 20 karaktere tamamla
  if (newId.length < 10) {
    const numZeros = 19 - newId.length;
    const zeros = "0".repeat(numZeros);
    newId = newId + zeros;
  } else if (newId.length > 19) {
    newId = newId.substring(0, 19);
  }

  // Sonuç olarak 20 karakter uzunluğunda bir benzersiz kimlik döndür
  return "-" + newId;
}

app.listen(PORT, () =>
  console.log(`Sunucu ${PORT} portunda çalışıyor... http://localhost:${PORT}`)
);
