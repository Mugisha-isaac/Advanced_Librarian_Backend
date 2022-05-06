import {Request,Response,NextFunction, Router} from 'express';
import NotAuthorisedTokenException from '../Exceptions/NotAuthorisedException';
import Controller from '../interfaces/controller.interface';
import RequestWithAdmin from '../interfaces/requestWithAdmin';
import authMiddleware from '../middleware/auth.middleware';
import Book from '../model/book.model';
import BooksNotFoundException from '../Exceptions/ItemsNotFoundException';
import BookNotFoundException from '../Exceptions/ItemNotFoundException'
import SavingNewBookFailedException from '../Exceptions/SavingNewItemFailedException';
import CreateAdminDto from '../admin/admin.dto';
import PasswordUtils from '../utils/password';

class BookController{
    public path ='/book';
    public router = Router();
    private book = Book;

    constructor(){
      this.initialiseRoutes();  
    }

    private initialiseRoutes(){
    
        this.router.get(`${this.path}/`, this.getAllBooks);
        this.router.get(`${this.path}/:id`, this.getBookById);
        this.router.post(`${this.path}/create`, this.createNewBook)
    }

    private getAllBooks =async(_:Request,response:Response, next:NextFunction)=>{
        const books = await this.book.find();
        if(books) return response.status(200).send(books);
        next(new BooksNotFoundException('books'));
    }

    private getBookById = async(request:Request, response:Response, next:NextFunction)=>{
         const id = request.params.id;
         const book = await this.book.findById(id);
         if(book) return response.status(200).send(book);
         next(new BookNotFoundException('book',id));
    }

    private createNewBook = async(request:Request,response:Response, next:NextFunction) =>{
         const newBook = await this.book.create({
            isbn: request.body.isbn,
            name:request.body.name,
            category: request.body.category,
            publisher: request.body.publisher,
            publicationDate: request.body.publicationDate,
            author: request.body.author,
            status: request.body.status
         });

         if(newBook) return response.status(201).send(newBook);
         next(new SavingNewBookFailedException('book'));
    }
}

export default BookController; 
