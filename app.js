const titleInput = document.querySelector('#title')
const authorInput = document.querySelector('#author')
const pagesInput = document.querySelector('#pages')
const readCheckbox = document.querySelector('input[name=checkbox]')
const allBooks = document.querySelector('#all-books')
const addNewBookBtn = document.querySelector('#add-new-book-btn')
const newBookForm = document.querySelector('.new-book-form')
const addBookBtn = document.querySelector('#add-book-btn')
const coverInput = document.querySelector('#cover');
const book = document.querySelector('#book')

const modalBg = document.querySelector('.modal-bg');
const modalClose = document.querySelector('.close');

let idNum = 0;
let myLibrary = [];

class Book {
    constructor (title, author, pages, read, cover) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.idNum = idNum;
        this.Url = cover;
    }
    haveRead() {
        this.read = true;
    }
    notRead() {
        this.read = false;
    }
}

let book2 = new Book('A Clockwork Orange','Anthony Burgess', 213, false, 'covers/book2.jpg');
createBook(book2);

let book1 = new Book('1984','George Orwell', 298, false, 'covers/book1.jpg');
createBook(book1);

let book3 = new Book('2001: A Space Odyssey','Arthur C. Clark', 297 , false, 'covers/book3.jpg');
createBook(book3);

/* let book4 = new Book('Brave New World','Aldous Huxley', 268  , false, 'covers/book4.jpg');
createBook(book4);

let book5 = new Book('The Bell Jar','Sylvia Plath', 294 , false, 'covers/book6.jpg');
createBook(book5);

let book6 = new Book('American Psycho','Bret Easton Ellis', 399 , false, 'covers/book5.jpg');
createBook(book6); */

function addBookToLibrary() {
    if(coverInput.validity.valid === true) {
        let title = titleInput.value
        let author = authorInput.value;
        let pages = pagesInput.value;
        let read = readCheckbox.value;
        let cover = coverInput.value;
        let book = new Book(title, author, parseInt(pages), read, cover);
        myLibrary.push(book);

        if (readCheckbox.checked == true || this.read == true) {
            book.haveRead();

        } else {
            book.notRead();
        }
        createBook(book); 
    } 
    else {
        alert('Leave URL field empty or enter a vaild adress')
    }
}

addBookBtn.addEventListener('click', () => {

    if (titleInput.value && authorInput.value && pagesInput.value) {
        addBookToLibrary();
        console.table(myLibrary);
        modalBg.classList.remove('bg-active');
        newBookForm.style.display = 'none';
        clearAllFields();
    }
})

addNewBookBtn.addEventListener('click', () => {
    newBookForm.style.display = 'flex';
    modalBg.classList.add('bg-active')
    addNewBookBtn.type = 'submit';
    clearAllFields();
})

modalClose.addEventListener('click', () => {
    modalBg.classList.remove('bg-active')
})

function clearAllFields(){
    titleInput.value = '';
    authorInput.value = '';
    pagesInput.value = '';
    coverInput.value = '';
    readCheckbox.checked = false;
}

function createBook(book) {
    idNum++; 
    const cover = document.createElement('img');
    const bookCard = document.createElement('div');
    const title = document.createElement('p');
    const author = document.createElement('p');
    const pages = document.createElement('p');
    const buttons = document.createElement('div');
    const readBtn = document.createElement('button');
    const removeBtn = document.createElement('button');
   
    bookCard.classList.add('book-card');
    title.classList.add('info');
    author.classList.add('info');
    pages.classList.add('info');
    title.classList.add('title');
    author.classList.add('author');
    pages.classList.add('pages');
    buttons.classList.add('button-group');
    readBtn.classList.add('btn');
    removeBtn.classList.add('btn');
    removeBtn.classList.add('remove');
    removeBtn.textContent = 'Remove';

    removeBtn.value =  `${book.idNum}`;
    title.textContent = `"${book.title}"`;
    author.textContent = `by: ${book.author}`;
    pages.textContent = `${book.pages} pages`;

    if (readCheckbox.checked == true) {
        readBtn.textContent = 'Read';
        readBtn.style.backgroundColor = '#059669';
    } else {
        readBtn.textContent = 'Not Read';
        readBtn.style.backgroundColor = '#DC2626';
    }
    readBtn.addEventListener('click', (e) => {       
         if (e.target.textContent === 'Read') {
            e.target.textContent = 'Not Read';
            readBtn.style.backgroundColor = '#DC2626';
        } 
        else{
            (e.target.textContent = 'Read') ;
            readBtn.style.backgroundColor = '#059669';
        }
    }) 
 
    removeBtn.addEventListener('click', () => {
        myLibrary.splice(book.idNum, 1);
        bookCard.innerHTML = "";
        bookCard.classList.remove('book-card')
    })

    if(book.Url != ''){
        cover.src = book.Url;
        cover.classList.add('book-cover');
    }else{
        cover.src = 'empty.png';
        cover.classList.add('book-cover');
        cover.style.border = 'none';
    }

    buttons.appendChild(readBtn);
    buttons.appendChild(removeBtn);
    bookCard.appendChild(buttons);
    bookCard.appendChild(cover);
    bookCard.appendChild(title);
    bookCard.appendChild(author);
    bookCard.appendChild(pages);
    allBooks.appendChild(bookCard);
} 

function removeChildNodes(parent){
    //remove all child nodes from container
    while(parent.firstChild){
        parent.removeChild(parent.firstChild);
    } 
}
