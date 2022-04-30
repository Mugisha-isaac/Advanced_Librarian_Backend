
import BorrowedBook from '../model/borrowedBook.model';

class BorrowedBookServices{
    async createBook(isbn:string, name:string, borrower: string,borrowedDate:Date, status:string){
        const book = new BorrowedBook();
        book.isbn = isbn,
        book.name = name,
        book.borrower = borrower,
        book.borrowedDate = borrowedDate,
        book.status = status
        book.save()
        return book;
    }

    async getAllBooks(){
        const books = await BorrowedBook.find();
        if(books) return books;
        return false;
    }

    async deleteBook(id:string){
        const book = await BorrowedBook.deleteOne({_id:id});
        if(!book) return false;
        return book;
    }
}

export default new BorrowedBookServices;