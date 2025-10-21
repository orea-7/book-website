function fetchBooks() {
    return fetch('../data/sample-books.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => data.books)
        .catch(error => console.error('There has been a problem with your fetch operation:', error));
}

export { fetchBooks };