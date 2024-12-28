const loginForm = document.getElementById('login-form');
const errorMessage = document.getElementById('error-message');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  if (email === 'admin@me.com' && password === 'admin@123') {
    localStorage.setItem('loginData', email);
    alert('Logged in as Admin.');
    window.location.href = 'admin.html';
  } else if (email === 'user@me.com' && password === 'user@123') {
    localStorage.setItem('loginData', email);
    alert('Logged in as User.');
    window.location.href = 'books.html';
  } else {
    errorMessage.textContent = 'Invalid credentials. Please try again.';
  }
});
