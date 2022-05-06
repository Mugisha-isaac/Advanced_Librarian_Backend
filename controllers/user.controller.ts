

import {Request,Response,NextFunction, Router} from 'express';
import NotAuthorisedExceptions from '../Exceptions/NotAuthorisedException';
import RequestWithUser from '../interfaces/requestWithUser';
import authMiddleware from '../middleware/auth.middleware';
import User from '../model/user.model';
import UserNotFoundException from '../Exceptions/ItemNotFoundException';
import Controller from '../interfaces/controller.interface';
import SavingNewUserFailedException from '../Exceptions/SavingNewItemFailedException';
import UsersNotFoundException from '../Exceptions/ItemsNotFoundException';


class UserController implements Controller {
    public path = '/user';
    public router = Router();
    private user = User;
     
    constructor(){
      this.initialiseRoutes()
    }

    private initialiseRoutes(){
      this.router.get(`${this.path}`,this.getAllUsers);
      this.router.get(`${this.path}`, this.getUserById);
      this.router.post(`${this.path}/signup`, this.createUser);
      this.router.get(`${this.path}/:id`, this.getUserDetails);
    }

    private getUserById = async (request:Request, response:Response, next: NextFunction)=>{
      const id = request.params.id;
      const user = await this.user.findById(id);
      if(user) return response.status(200).send(user);
      next(new UserNotFoundException('user',id))
    }

    private getAllUsers = async(_:Request,response:Response, next:NextFunction)=>{
      const users = await this.user.find();
      if(users) return response.status(200).send(users);
      next(new UsersNotFoundException('user'))
    }

    private createUser = async(request:Request, response:Response, next:NextFunction) =>{
      const user = await this.user.create({
          email: request.body.email,
          name: request.body.name,
          address: request.body.address,
          phone: request.body.phone
      });

      if(user) return response.status(201).send(user);
      next(new SavingNewUserFailedException('user'))
    }

    private getUserDetails = async(request:Request, response:Response, next:NextFunction)=>{
      let id = request.params.id;
      const userDetails = [];

      const user = await this.user.findById(id);
      if(user) return response.status(200).send(user);
      next(new UserNotFoundException('user', id));
    }
}

export default UserController;