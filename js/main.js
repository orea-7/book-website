const bookList = document.getElementById('book-list');
const addBookBtn = document.getElementById('add-book-btn');
const bookTitleInput = document.getElementById('book-title');

// LocalStorage'dan kitapları yükle
let books = JSON.parse(localStorage.getItem('books')) || [];

// Kitapları ekrana bas
function renderBooks() {
  bookList.innerHTML = '';
  books.forEach((book, index) => {
    const bookDiv = document.createElement('div');
    bookDiv.className = 'book';
    bookDiv.innerHTML = `
      <img src="${book.cover}" alt="${book.title}">
      <h3>${book.title}</h3>
      <label>
        <input type="checkbox" class="read-checkbox" data-index="${index}" ${book.read ? 'checked' : ''}>
        Okudum
      </label>
      <textarea class="book-notes" placeholder="Düşüncelerini yaz..." data-index="${index}">${book.notes || ''}</textarea>
      <button class="delete-book-btn" data-index="${index}">Sil</button>
    `;
    bookList.appendChild(bookDiv);
  });
}

// Open Library API’den kapak al
async function getBookCover(title) {
  try {
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(title)}`);
    const data = await response.json();
    if (data.items && data.items[0] && data.items[0].volumeInfo.imageLinks) {
      return data.items[0].volumeInfo.imageLinks.thumbnail;
    }
    // Eğer API'de kapak yoksa
    return 'https://via.placeholder.com/120x180?text=No+Cover';
  } catch (error) {
    console.error('Kitap kapağı alınamadı:', error);
    return 'https://via.placeholder.com/120x180?text=No+Cover';
  }
}


// Kitap ekleme
addBookBtn.addEventListener('click', async () => {
  const title = bookTitleInput.value.trim();
  if (!title) return alert('Lütfen kitap adı yaz!');
  const cover = await getBookCover(title);
  books.push({ title, cover, read: false, notes: '' });
  localStorage.setItem('books', JSON.stringify(books));
  bookTitleInput.value = '';
  renderBooks();
});

// Checkbox ve notları kaydetme
bookList.addEventListener('change', (e) => {
  if (e.target.classList.contains('read-checkbox')) {
    const index = e.target.dataset.index;
    books[index].read = e.target.checked;
    localStorage.setItem('books', JSON.stringify(books));
  }
});

bookList.addEventListener('input', (e) => {
  if (e.target.classList.contains('book-notes')) {
    const index = e.target.dataset.index;
    books[index].notes = e.target.value;
    localStorage.setItem('books', JSON.stringify(books));
  }
});

// Silme butonu
bookList.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-book-btn')) {
    const index = e.target.dataset.index;
    books.splice(index, 1); // Kitabı diziden sil
    localStorage.setItem('books', JSON.stringify(books)); // LocalStorage güncelle
    renderBooks(); // Yeniden render
  }
});

// Sayfa açılınca render et
renderBooks();
