const myLibrary = [];

function  Book(Title, Author, Pages, Read) {
    this.Title = Title;
    this.Author = Author;
    this.Pages = Pages;
    this.Read =  Read;
}

function addBookToLibrary(Title, Author, Pages, Read) {
    let book = new Book(Title, Author, Pages, Read);
    myLibrary.push(book);
    displayBookOnPage();
}

function displayBookOnPage() {
    const books = document.querySelector('.books');

    const removeDivs = document.querySelectorAll('.card');
    console.log('show me the node count of current card divs...', removeDivs);
    for (let i = 0; i < removeDivs.length; i++) {
        removeDivs[i].remove();
    }

    let index = 0
    myLibrary.forEach(myLibrarys => {
        const card = document.createElement('div');
        card.classList.add('card');
        books.appendChild(card);
        
        const removeBookButton = document.createElement('button');
        removeBookButton.classList.add('remove-book-button');
        removeBookButton.textContent = 'Remove from library'
        console.log('show me the current array objects inside of foreach...', myLibrary);

        removeBookButton.dataset.linkArray = index;
        console.log('show me the dataset link back to the array...', removeBookButton.dataset.linkArray);
        card.appendChild(removeBookButton);

        removeBookButton.addEventListener('click', removeBookFromLibrary);

        function removeBookFromLibrary() {
            let retrieveBookToRemove = removeBookButton.dataset.linkArray;
            console.log('Attempting to remove array item via  data attribute...', parseInt(retrieveBookToRemove));
            myLibrary.splice(parseInt(retrieveBookToRemove), 1);
            card.remove();
            displayBookOnPage();
        }

        const readStatusButton = document.createElement('button');
        readStatusButton.classList.add('read-status-button');
        readStatusButton.textContent = 'Toggle Read Status';

        readStatusButton.dataset.linkArray = index;
        console.log('Show me the dataset link back to the array for Read status button...', readStatusButton.dataset.linkArray);
        card.appendChild(readStatusButton);

        readStatusButton.addEventListener('click', toggleReadStatus);

        function toggleReadStatus() {
            let retrieveBookToToggle = readStatusButton.dataset.linkArray;
            //Book.prototype = Object.create(Book.prototype);
            const toggleBook = new  Book();
            console.log('What is the toggle initial value?...', myLibrary[parseInt(retrieveBookToToggle).Read]);

            if ((myLibrary[parseInt(retrieveBookToToggle)].Read) == 'Yes') {
                toggleBook.Read = 'No';
                myLibrary[parseInt(retrieveBookToToggle)].Read = toggleBook.Read;
            } else if ((myLibrary[parseInt(retrieveBookToToggle)].Read) == 'No') {
                toggleBook.Read = 'Yes';
                myLibrary[parseInt(retrieveBookToToggle)].Read = toggleBook.Read;
            }
            displayBookOnPage();
        }

        for (let key in myLibrarys) {
            console.log(`${key}: ${myLibrarys[key]}`);
            const para = document.createElement('p');
            para.textContent = (`${key}: ${myLibrarys[key]}`);
            card.appendChild(para);
        }
    index++;    
    })
}

const addBookButton = document.querySelector('.add-button')
addBookButton.addEventListener('click', displayTheForm);

function displayTheForm() {
    document.getElementById('add-form').style.display = "";
}

const submitButton = document.querySelector('.submit-button');
submitButton.addEventListener('click', intakeFormData);

function intakeFormData() {
    let Title = document.getElementById('Title').value;
    let Author = document.getElementById('Author').value;
    let Pages = document.getElementById('Author').value;
    let Read = document.getElementById('Read').value;

    if ((Title == "") || (Author == "") || (Pages == "") || (Read == "")) {
        return;
    }

    addBookToLibrary(Title, Author,  Pages, Read);

    document.getElementById('add-book').reset();
}

const clearButton = document.querySelector('.reset-button');
clearButton.addEventListener('click', clearForm);

function clearForm() {
    document.getElementById('add-book').reset();
}