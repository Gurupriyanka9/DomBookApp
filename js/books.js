const baseUrl = "https://your-glitch-project-url.glitch.me/books";

document.getElementById("showAvailableBtn").addEventListener("click", function () {
    fetch(baseUrl)
    .then(response => response.json())
    .then(books => {
        const availableBooks = books.filter(book => book.isAvailable);
        displayBooks(availableBooks);
    })
    .catch(error => console.error("Error:", error));
});

document.getElementById("showBorrowedBtn").addEventListener("click", function () {
    fetch(baseUrl)
    .then(response => response.json())
    .then(books => {
        const borrowedBooks = books.filter(book => !book.isAvailable);
        displayBooks(borrowedBooks);
    })
    .catch(error => console.error("Error:", error));
});

function displayBooks(books) {
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
            <button onclick="borrowBook(${book.id})" ${!book.isAvailable ? "disabled" : ""}>Borrow Book</button>
            <button onclick="returnBook(${book.id})" ${book.isAvailable ? "disabled" : ""}>Return Book</button>
        `;
        bookList.appendChild(bookCard);
    });
}

function borrowBook(bookId) {
    const duration = prompt("Enter borrowing duration (max 10 days):");
    if (duration > 0 && duration <= 10) {
        fetch(`${baseUrl}/${bookId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                isAvailable: false,
                borrowedDays: duration
            })
        })
        .then(response => response.json())
        .then(() => {
            alert("Book Borrowed Successfully");
            displayBooks();
        })
        .catch(error => console.error("Error:", error));
    }
}

function returnBook(bookId) {
    if (confirm("Are you sure to return the book?")) {
        fetch(`${baseUrl}/${bookId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                isAvailable: true,
                borrowedDays: null
            })
        })
        .then(response => response.json())
        .then(() => {
            alert("Book Returned Successfully");
            displayBooks();
        })
        .catch(error => console.error("Error:", error));
    }
}
