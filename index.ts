// import express from 'express';
// import cors from 'cors';
// import mongoose from 'mongoose';
// import DB from './config/db.config';
// import UsersRoutes from './routes/user.routes';
// import BorrowedBooksRoutes from './routes/borrowedBook.routes';
// import OrderRoutes from './routes/order.routes';
// import BooksRoutes from './routes/book.routes';
// import AdminRoutes from './routes/admin.routes';


// const app = express();
// const port = process.env.PORT || 4000;



//  app.get('/', (req,res)=>{
//    res.send({message: "welcome to libralian backend apis"})
//  })

//  app.use(cors())
//  app.use(express.json())
//  app.use(express.urlencoded({extended:true}))
//  app.use('/user',UsersRoutes);
//  app.use('/Borrowedbook',BorrowedBooksRoutes);
//  app.use('/order',OrderRoutes);
//  app.use('/book',BooksRoutes);
//  app.use('/admin',AdminRoutes);

// mongoose.connect('mongodb://localhost/libralian').then(()=>{
//     console.log(`Connection to database succeded`);
// }).catch(()=>{
//     console.log(`Failed to connect to database`);
// })


// app.listen(port,()=>{
//     console.log(`server is running on port ${port}`);
// })

import 'dotenv/config';
import App from './app';
import AuthenticationController from './Authentication/Authentication.controller';
import UserController from './controllers/user.controller';
import AdminController from './controllers/admin.controller';
import ValidateEnv from './utils/ValidateEnv';


ValidateEnv();

const app = new App(
    [
        new UserController(),
        new AdminController()
    ]
)

app.Listen();   