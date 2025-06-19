
const favoriteBooks = [];
const filters = [];



const bookTemplate = Handlebars.compile(document.querySelector('#template-book').innerHTML);
const booksList = document.querySelector('.books-list');

function render() {
    for (const book of dataSource.books) {
        const ratingBgc = determineRatingBgc(book.rating);
        const ratingWidth = book.rating * 10;

        book.ratingBgc = ratingBgc;
        book.ratingWidth = ratingWidth;

        const generatedHTML = bookTemplate(book);
        const bookDOM = utils.createDOMFromHTML(generatedHTML);
        booksList.appendChild(bookDOM);
    }
}
function initActions() {
    const booksList = document.querySelector('.books-list');

    // --- obsługa dwukliku ulubionych
    booksList.addEventListener('dblclick', function (event) {
        event.preventDefault();

        const clickedElement = event.target.offsetParent;

        if (clickedElement.classList.contains('book__image')) {
            const bookId = clickedElement.getAttribute('data-id');

            if (!favoriteBooks.includes(bookId)) {
                clickedElement.classList.add('favorite');
                favoriteBooks.push(bookId);
            } else {
                clickedElement.classList.remove('favorite');
                const index = favoriteBooks.indexOf(bookId);
                favoriteBooks.splice(index, 1);
            }

            console.log('Ulubione:', favoriteBooks);
        }
    });

    // --- obsługa formularza filtrów
    const filtersForm = document.querySelector('.filters form');

    filtersForm.addEventListener('click', function (event) {
        const clickedElement = event.target;

        if (
            clickedElement.tagName === 'INPUT' &&
            clickedElement.type === 'checkbox' &&
            clickedElement.name === 'filter'
        ) {
            const value = clickedElement.value;

            if (clickedElement.checked) {
                filters.push(value);
            } else {
                const index = filters.indexOf(value);
                filters.splice(index, 1);
            }

            console.log('Aktywne filtry:', filters);
            filterBooks();
        }
    });
}
function filterBooks() {
    for (const book of dataSource.books) {
        let shouldBeHidden = false;

        for (const filter of filters) {
            if (!book.details[filter]) {
                shouldBeHidden = true;
                break;
            }
        }

        const bookImage = document.querySelector('.book__image[data-id="' + book.id + '"]');

        if (shouldBeHidden) {
            bookImage.classList.add('hidden');
        } else {
            bookImage.classList.remove('hidden');
        }
    }
}

function determineRatingBgc(rating) {
    let background = '';

    if (rating < 6) {
        background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
    } else if (rating > 6 && rating <= 8) {
        background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
    } else if (rating > 8 && rating <= 9) {
        background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
    } else if (rating > 9) {
        background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
    }

    return background;
}




document.addEventListener('DOMContentLoaded', function () {
    render();
    initActions();
});
