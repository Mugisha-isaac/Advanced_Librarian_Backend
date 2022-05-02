

import {Request,Response,NextFunction, Router} from 'express';
import NotAuthorisedTokenException from '../Exceptions/NotAuthorisedException';
import Controller from '../interfaces/controller.interface';
import RequestWithAdmin from '../interfaces/requestWithAdmin';
import authMiddleware from '../middleware/auth.middleware';
import BorrowedBook from '../model/borrowedBook.model';
import BooksNotFoundException from '../Exceptions/ItemsNotFoundException';
import BookNotFoundException from '../Exceptions/ItemNotFoundException'
import SavingNewBookFailedException from '../Exceptions/SavingNewItemFailedException';

class BorrowedBookController{
    public path ='/Borrowedbook';
    public router = Router();
    private bBook = BorrowedBook;

    constructor(){
      this.initialiseRoutes();  
    }

    private initialiseRoutes(){
    
        this.router.get(`${this.path}/`, this.getAllBorrowedBooks);
        this.router.get(`${this.path}/:id`, authMiddleware, this.getBorrowedBookById);
        this.router.post(`${this.path}/register`, this.createNewBBook)
    }

    private getAllBorrowedBooks =async(_:Request,response:Response, next:NextFunction)=>{
        const books = await this.bBook.find();
        if(books) return response.status(200).send(books);
        next(new BooksNotFoundException('users'));
    }

    private getBorrowedBookById = async(request:Request, response:Response, next:NextFunction)=>{
         const id = request.params.id;
         const book = await this.bBook.findById(id);
         if(book) return response.status(200).send(book);
         next(new BookNotFoundException('book', id));
    }

    private createNewBBook = async(request:Request,response:Response, next:NextFunction) =>{
         const newBBook = await this.bBook.create({
            isbn: request.body.isbn,
            name:request.body.name,
            borrower: request.body.borrower,
            borrowedDate: request.body.borrowedDate,
            status: request.body.status
         });

         if(newBBook) return response.status(201).send(newBBook);
         next(new SavingNewBookFailedException('book'));
    }
}

export default BorrowedBookController;
