
import express from 'express';
import BookServices from '../services/book.services';

class BookControllers{
    async createNewBookController(req:express.Request,res:express.Response){
        const book = await BookServices.createNewBook(req.body.isbn,req.body.name,req.body.category,req.body.publisher,req.body.publicationDate,req.body.author,req.body.status);
        if(!book) return res.status(400).send({message:"Failed to create new book"});
        return res.status(201).send(book);
    }

    async getAllBooks(_:express.Request,res:express.Response){
        const books = await BookServices.getAllBooks();
        if(books) return res.status(200).send(books);
        return res.status(404).send({message:"Not Found"})
    }
}


export default new BookControllers;