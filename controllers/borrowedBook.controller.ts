import express from 'express';
import BorrowedBookServices from '../services/borroweBook.services';


class BorrowedBookContoller{
    async createBookController(req:express.Request, res: express.Response){
        const book = await BorrowedBookServices.createBook(req.body.isbn,req.body.name,req.body.borrower,req.body.borrowedDate,req.body.status);
        if(book) return res.status(201).send({success:true,message:'Book saved successfully',data:book});
        return res.status(400).send({success:false,message:'Failed to save new book'});
    }

    async getBooksController(req:express.Request, res:express.Response){
        const books = await BorrowedBookServices.getAllBooks();
        if(books) return res.status(200).send(books);
        return res.status(404).send({success:false,message:'Not Found', data:books});
    }

    async deleteBookController(req:express.Request, res:express.Response){
        const book = await BorrowedBookServices.deleteBook(req.params.id);
        if(book) return res.status(200).send({success:true,message:'Book deleted successfully',data:book});
        return res.status(400).send({success:false,message:'Failed to delete book', data:book});
    }
}


export default new BorrowedBookContoller;