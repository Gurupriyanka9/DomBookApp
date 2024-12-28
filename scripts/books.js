const loginData = JSON.parse(localStorage.getItem("loginData"));
if (!loginData || loginData.email !== "user@empher.com") {
  alert("User Not Logged In");
  window.location.href = "index.html";
}

const bookContainer = document.getElementById("bookContainer");

// Fetch and display available books
async function showAvailableBooks() {
  try {
    const res = await fetch(${BASE_URL}?isAvailable=true);
    const books = await res.json();
    displayBooks(books, true);
  } catch {
    alert("Error fetching available books");
  }
}

// Fetch and display borrowed books
async function showBorrowedBooks() {
  try {
    const res = await fetch(${BASE_URL}?isAvailable=false);
    const books = await res.json();
    displayBooks(books, false);
  } catch {
    alert("Error fetching borrowed books");
  }
}

// Display books in a grid layout
function displayBooks(books, isAvailable) {
  bookContainer.innerHTML = books
    .map((book) => `
      <div class="card">
        <img src="${book.imageUrl}" alt="Book Cover" style="width:100%">
        <h3>${book.title}</h3>
        <p>Author: ${book.author}</p>
        <p>Category: ${book.category}</p>
        <p>Status: ${book.isAvailable ? "Available" : "Borrowed"}</p>
        ${isAvailable 
          ? <button onclick="borrowBook(${book.id})">Borrow Book</button>
          : `<p>Borrowed Days: ${book.borrowedDays}</p>
             <button onclick="returnBook(${book.id})">Return Book</button>`}
      </div>
    `)
    .join("");
}

// Borrow a book
async function borrowBook(bookId) {
  const duration = prompt("Enter the number of days to borrow the book (1-10):");
  const borrowedDays = parseInt(duration);

  if (borrowedDays < 1 || borrowedDays > 10 || isNaN(borrowedDays)) {
    alert("Invalid borrowing duration. Please enter a number between 1 and 10.");
    return;
  }

  try {
    await fetch(${BASE_URL}/${bookId}, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isAvailable: false, borrowedDays }),
    });
    alert("Book Borrowed Successfully");
    showAvailableBooks(); // Refresh the book list
  } catch {
    alert("Error borrowing the book");
  }
}

// Return a book
async function returnBook(bookId) {
  const confirmReturn = confirm("Are you sure you want to return the book?");
  if (!confirmReturn) return;

  try {
    await fetch(${BASE_URL}/${bookId}, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isAvailable: true, borrowedDays: null }),
    });
    alert("Book Returned Successfully");
    showBorrowedBooks(); // Refresh the book list
  } catch {
    alert("Error returning the book");
  }
}

// Event Listeners for Buttons
document.getElementById("availableBooks").addEventListener("click", showAvailableBooks);
document.getElementById("borrowedBooks").addEventListener("click", showBorrowedBooks);