const loginData = JSON.parse(localStorage.getItem("loginData"));
if (!loginData || loginData.email !== "admin@empher.com") {
  alert("Admin Not Logged In");
  window.location.href = "index.html";
}

document.getElementById("bookForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const category = document.getElementById("category").value;

  const book = {
    title,
    author,
    category,
    isAvailable: true,
    isVerified: false,
    borrowedDays: null,
    imageUrl: "https://m.media-amazon.com/images/I/71ZB18P3inL.SY522.jpg",
  };

  try {
    await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book),
    });
    alert("Book Added Successfully.");
    loadBooks();
  } catch {
    alert("Error adding book.");
  }
});

async function loadBooks() {
  try {
    const res = await fetch(BASE_URL);
    const books = await res.json();
    document.getElementById("bookContainer").innerHTML = books
      .map(
        (book) => `
      <div class="card">
        <h3>${book.title}</h3>
        <p>${book.author}</p>
        <p>${book.category}</p>
        <button ${book.isVerified ? "disabled" : ""} onclick="verifyBook(${book.id})">Verify Book</button>
        <button onclick="deleteBook(${book.id})">Delete Book</button>
      </div>
    `
      )
      .join("");
  } catch {
    alert("Error loading books.");
  }
}

async function verifyBook(bookId) {
  try {
    await fetch(${BASE_URL}/${bookId}, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isVerified: true }),
    });
    alert("Book Verified Successfully.");
    loadBooks();
  } catch {
    alert("Error verifying book.");
  }
}

async function deleteBook(bookId) {
  try {
    await fetch(${BASE_URL}/${bookId}, {
      method: "DELETE",
    });
    alert("Book Deleted Successfully.");
    loadBooks();
  } catch {
    alert("Error deleting book.");
  }
}

loadBooks();