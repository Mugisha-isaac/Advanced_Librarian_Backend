
import Book from '../model/book.model';

class BookServices{
    async createNewBook(isbn:string,name:string,category:string,publisher:string,publicationDate:Date,author:string,status:string){
        const book = new Book();
        book.isbn = isbn
        book.name = name
        book.category = category
        book.publisher = publisher
        book.publicationDate = publicationDate
        book.author = author
        book.status = status
        book.save()
        return book
    }

    async getAllBooks(){
        const books = await Book.find();
        if(!books) return false;
        return books;
    }
}

export default new BookServices;