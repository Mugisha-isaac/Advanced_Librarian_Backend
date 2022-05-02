
import {Request,Response,NextFunction, Router} from 'express';
import NotAuthorisedTokenException from '../Exceptions/NotAuthorisedException';
import Controller from '../interfaces/controller.interface';
import RequestWithAdmin from '../interfaces/requestWithAdmin';
import authMiddleware from '../middleware/auth.middleware';
import Admin from '../model/admin.model';
import UsersNotFoundException from '../Exceptions/ItemsNotFoundException';
import UserNotFoundException from '../Exceptions/ItemNotFoundException'
import SavingNewAdminFailedException from '../Exceptions/SavingNewItemFailedException';
import CreateAdminDto from '../admin/admin.dto';
import PasswordUtils from '../utils/password';

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
        next(new UsersNotFoundException('user'));
    }

    private getAdminById = async(request:Request, response:Response, next:NextFunction)=>{
         const id = request.params.id;
         const user = await this.admin.findById(id);
         if(user) return response.status(200).send(user);
         next(new UserNotFoundException('user',id));
    }

    private createAdmin = async(request:Request,response:Response, next:NextFunction) =>{
        const HashedPassword = await PasswordUtils.hashPassword(request.body.password);
         const newAdmin = await this.admin.create({
             username: request.body.username,
             password:HashedPassword,
             isAdmin: request.body.isAdmin
         });

         if(newAdmin) return response.status(201).send({success:true, message:"Admin successfully created", data: newAdmin});
         next(new SavingNewAdminFailedException('admin'));
    }
}

export default AdminController;
