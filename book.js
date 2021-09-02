const clearData = () => {
    document.getElementById('search-input').value = '';
    document.getElementById('search-result').innerHTML = '';
    document.getElementById('found').innerText = '';


}

const searchBook = () => {
    const searchField = document.getElementById('search-input');
    const searchText = searchField.value;

    if (searchText === '') {
        clearData();
        const errorMsg = document.getElementById('error-text');
        const div = document.createElement('div');
        div.innerHTML =
            ` <p>Please type your book name</p>`
        errorMsg.appendChild(div);
    }


    else {

        clearData();
        const url = `http://openlibrary.org/search.json?q=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.docs));

    }


}
const displaySearchResult = books => {


    document.getElementById('found').innerText = `About ${books.length} results found`;

    books.forEach(book => {

        const { cover_i } = book;
        const imgSrc = `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`;
        const div = document.createElement('div');
        div.classList.add('col', 'border', 'p-5', 'bg-light');
        div.innerHTML = `
        <div>
            <img src="${imgSrc}" class="card-img-top" alt="...">
            <div class="card-body ">
            <h3 class="card-title ">Book Name:${book.title}</h3>
            <h4 class="card-title">Author Name:${book.author_name}</h4>
            <h5 class="card-title">Publisher Name:${book.publisher}</h5>
            <p class="card-title text-Secondary">Publish:${book.first_publish_year}</p>  
            </div>
        </div>
        `

        document.getElementById('search-result').appendChild(div);
    })


}