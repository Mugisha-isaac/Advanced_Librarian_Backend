import {Request,Response,NextFunction, Router} from 'express';
import NotAuthorisedTokenException from '../Exceptions/NotAuthorisedException';
import Controller from '../interfaces/controller.interface';
import RequestWithAdmin from '../interfaces/requestWithAdmin';
import authMiddleware from '../middleware/auth.middleware';
import Order from '../model/orders.model';
import UsersNotFoundException from '../Exceptions/ItemsNotFoundException';
import UserNotFoundException from '../Exceptions/ItemNotFoundException'
import SavingNewOrderFailedException from '../Exceptions/SavingNewItemFailedException';
import CreateAdminDto from '../admin/admin.dto';
import PasswordUtils from '../utils/password';

class OrderController{
    public path ='/order';
    public router = Router();
    private order = Order;

    constructor(){
      this.initialiseRoutes();  
    }

    private initialiseRoutes(){
    
        this.router.get(`${this.path}/`, this.getAllOrders);
        this.router.get(`${this.path}/:id`, this.getOrderById);
        this.router.post(`${this.path}/create`, this.createNewOrder)
    }

    private getAllOrders =async(_:Request,response:Response, next:NextFunction)=>{
        const orders = await this.order.find();
        if(orders) return response.status(200).send(orders);
        next(new UsersNotFoundException('orders'));
    }

    private getOrderById = async(request:Request, response:Response, next:NextFunction)=>{
         const id = request.params.id;
         const order = await this.order.findById(id);
         if(order) return response.status(200).send(order);
         next(new UserNotFoundException('order',id));
    }

    private createNewOrder = async(request:Request,response:Response, next:NextFunction) =>{
         const newOrder = await this.order.create({
            orderDate: request.body.orderDate,
            customer:request.body.customer,
            status: request.body.status,
            price: request.body.price,
            deliveryDate: request.body.deliveryDate
         });

         if(newOrder) return response.status(201).send(newOrder);
         next(new SavingNewOrderFailedException('order'));
    }
}

export default OrderController;
