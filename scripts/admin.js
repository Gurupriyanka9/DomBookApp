const addBookForm = document.getElementById('add-book-form');
const booksContainer = document.getElementById('books-container');
const API_URL = 'http://localhost:3200/books'; // Replace with your Glitch backend URL


async function fetchBooks() {
  const res = await fetch(API_URL);
  const books = await res.json();
  booksContainer.innerHTML = books.map((book) => `
    <div>
      <h3>${book.title}</h3>
      <p>Author: ${book.author}</p>
      <p>Category: ${book.category}</p>
      <p>Available: ${book.isAvailable ? 'Yes' : 'No'}</p>
      <button onclick="deleteBook(${book.id})">Delete</button>
    </div>
  `).join('');
}


addBookForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const category = document.getElementById('category').value;

  const newBook = { title, author, category, isAvailable: true, borrowedDays: null, image: 'https://m.media-amazon.com/images/I/61Iz2yy2CKL.jpg' };
  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newBook),
  });
  alert('Book Added Successfully');
  fetchBooks();
});


async function deleteBook(id) {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  fetchBooks();
}


fetchBooks();
