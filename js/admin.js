const baseUrl = "https://imported-concise-cloud.glitch.me/";

document.getElementById("addBookForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const category = document.getElementById("category").value;

    const newBook = {
        title,
        author,
        category,
        isAvailable: true,
        isVerified: false,
        borrowedDays: null,
        imageUrl: "https://m.media-amazon.com/images/I/71ZB18P3inL.SY522.jpg"
    };

    fetch(baseUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newBook)
    })
    .then(response => response.json())
    .then(data => {
        alert("Book Added Successfully");
        loadBooks();
    })
    .catch(error => {
        console.error("Error:", error);
    });
});

// Load books for admin page
function loadBooks() {
    fetch(baseUrl)
    .then(response => response.json())
    .then(books => {
        const bookList = document.getElementById("bookList");
        bookList.innerHTML = "";
        books.forEach(book => {
            const bookCard = document.createElement("div");
            bookCard.classList.add("card");
            bookCard.innerHTML = `
                <img src="${book.imageUrl}" alt="Book Image">
                <h3>${book.title}</h3>
                <p>${book.author}</p>
                <p>${book.category}</p>
                <p>Status: ${book.isAvailable ? "Available" : "Not Available"}</p>
                <button onclick="verifyBook(${book.id})">Verify Book</button>
                <button onclick="deleteBook(${book.id})">Delete Book</button>
            `;
            bookList.appendChild(bookCard);
        });
    })
    .catch(error => console.error("Error:", error));
}

// Verify book functionality
function verifyBook(bookId) {
    fetch(`${baseUrl}/${bookId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ isVerified: true })
    })
    .then(response => response.json())
    .then(data => {
        alert("Book Verified Successfully");
        loadBooks();
    })
    .catch(error => console.error("Error:", error));
}

// Delete book functionality
function deleteBook(bookId) {
    if (confirm("Are you sure to delete this book?")) {
        fetch(`${baseUrl}/${bookId}`, {
            method: "DELETE"
        })
        .then(response => response.json())
        .then(() => {
            alert("Book Deleted Successfully");
            loadBooks();
        })
        .catch(error => console.error("Error:", error));
    }
}
