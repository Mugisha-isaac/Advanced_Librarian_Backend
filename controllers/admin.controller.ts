
import {Request,Response,NextFunction, Router} from 'express';
import NotAuthorisedTokenException from '../Exceptions/NotAuthorisedException';
import Controller from '../interfaces/controller.interface';
import RequestWithAdmin from '../interfaces/requestWithAdmin';
import authMiddleware from '../middleware/auth.middleware';
import Admin from '../model/admin.model';
import UsersNotFoundException from '../Exceptions/UsersNotFoundException';
import UserNotFoundException from '../Exceptions/UserNotFoundException'
import SavingNewUserFailedException from '../Exceptions/SavingNewUserFailedException';
import CreateAdminDto from '../admin/admin.dto';

class AdminController{
    public path ='/admin';
    public router = Router();
    private admin = Admin;

    constructor(){
      this.initialiseRoutes();  
    }

    private initialiseRoutes(){
    
        this.router.get(`${this.path}/`, authMiddleware, this.getAllAdmins);
        this.router.get(`${this.path}/:id`, authMiddleware, this.getAdminById);
        this.router.post(`${this.path}/register`, this.createAdmin)
    }

    private getAllAdmins =async(_:Request,response:Response, next:NextFunction)=>{
        const users = await this.admin.find();
        if(users) return response.status(200).send(users);
        next(new UsersNotFoundException());
    }

    private getAdminById = async(request:Request, response:Response, next:NextFunction)=>{
         const id = request.params.id;
         const user = await this.admin.findById(id);
         if(user) return response.status(200).send(user);
         next(new UserNotFoundException(id));
    }

    private createAdmin = async(request:Request,response:Response, next:NextFunction) =>{
         const newAdmin = await this.admin.create({
             username: request.body.username,
             password: request.body.password,
             isAdmin: request.body.isAdmin
         });

         if(newAdmin) return response.status(201).send({success:true, message:"Admin successfully created", data: newAdmin});
         next(new SavingNewUserFailedException('admin'));
    }
}

export default AdminController;
