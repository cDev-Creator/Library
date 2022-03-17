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

let idNum = 0;
let myLibrary = [];

function Book(title, author, pages, read, cover) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.idNum = idNum;
  this.Url = cover;
} 
 
Book.prototype.haveRead = function () {
    this.read = true;
}
Book.prototype.notRead = function () {
    this.read = false;
}

let rat = new Book('Gaming Rat','Rat King', 423, true, 'rat.jpg');
createBook(rat);




function addBookToLibrary() {
    /* const validation = doument.querySelector('.validation-text') */
    if(coverInput.validity.valid === true) {
        let title = titleInput.value
        let author = authorInput.value;
        let pages = pagesInput.value;
        let read = false;
        let cover = coverInput.value;
        let book = new Book(title, author, parseInt(pages), read, cover);
        myLibrary.push(book);

        if (readCheckbox.checked == true) {
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

const body =  document.getElementsByTagName("BODY")[0]; 


addBookBtn.addEventListener('click', () => {

    if (titleInput.value && authorInput.value && pagesInput.value) {
        addBookToLibrary();
        console.table(myLibrary);
        /* allBooks.classList.remove('blur'); */
        newBookForm.style.display = 'none';
        clearAllFields();
    }
})

addNewBookBtn.addEventListener('click', () => {
   /*  allBooks.classList.add('blur'); */
    newBookForm.style.display = 'flex';
    addNewBookBtn.type = 'submit';
    clearAllFields();
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

