let myLibrary = [];
const savedBooks = localStorage.getItem("books");

if (savedBooks){
    myLibrary= JSON.parse(savedBooks)
}


function Book(name, author,read){
    this.id = Math.floor(Math.random()*100000);
    this.name = name;
    this.author = author;
    this.read = read;
   

}
function addBookToLibrary(name,author,read){
    const book = new Book(name, author, read);

    myLibrary.push(book);
    localStorage.setItem("books", JSON.stringify(myLibrary));
}

function displayBooks(){
    const table = document.querySelector("#bookTable");
   
    table.innerHTML = "";

    myLibrary.forEach(function(book){
         const row = document.createElement("tr");

         row.innerHTML = `
         <td>${book.id} </td>
         <td>${book.name}</td>
         <td>${book.author}</td>
         <td>${book.read ? "Read" : "Not read"}</td>
         <td><button data-id="${book.id}">Delete</button></td>
         


         `;
         table.appendChild(row);
    

    });




    
}
const table = document.querySelector('#bookTable')
table.addEventListener("click", function(event){
        if(event.target.textContent === "Delete"){
            const id =Number(event.target.dataset.id);
            const index = myLibrary.findIndex(function(book){
                return book.id === id;
            });
            myLibrary.splice(index,1);
            localStorage.setItem("books", JSON.stringify(myLibrary));
            displayBooks()
            
        }
    });
displayBooks()
const button = document.querySelector("#btn");
const form = document.querySelector("#bookForm");
button.addEventListener("click", addBook);
function addBook(){
    form.style.display ="block";

}
form.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.querySelector("#name").value;
    const author = document.querySelector("#author").value;
    const read = document.querySelector("#read").checked;

    addBookToLibrary(name, author, read);

    displayBooks();
});
