
import 'dotenv/config';
import App from './app';
import AuthenticationController from './Authentication/Authentication.controller';
import UserController from './controllers/user.controller';
import AdminController from './controllers/admin.controller';
import ValidateEnv from './utils/ValidateEnv';
import BorrowedBookController from './controllers/borrowedBook.controller'
import OrderController from './controllers/order.controller'
import BookController from './controllers/book.controller';

ValidateEnv();

const app = new App(
    [
        new UserController(),
        new AdminController(),
        new AuthenticationController(),
        new BorrowedBookController(),
        new OrderController(),
        new BookController()
    ]
)

app.Listen();   