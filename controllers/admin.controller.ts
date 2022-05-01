
// import express from 'express';
// import * as jwt from 'jsonwebtoken';
// import adminService from '../services/admin.service';

// class AdminController{
//      createNewAdminController = async(req:express.Request,  res:express.Response)=>{
//         const admin = await adminService.createNewAdmin(req.body.username,req.body.password,req.body.isAdmin);
//         if(!admin) return res.status(400).send({message:"Failed to create new admin"});
//         return res.status(201).send(admin);
//     }

//     adminLoginController = async(req:express.Request,res:express.Response)=>{
//         const admin = await adminService.Login(req.body.username,req.body.password);
//         if(!admin) return res.status(300).send({message:"invalid credentials", success:false});
//         const admin_id = admin._id;
//         let payload = {admin_id};
//         let token = jwt.sign(payload,"swsh23hjddnns",{
//             algorithm: "HS256",
//             expiresIn:86400
//         })

//         res.cookie("jwt",token,{secure:true, httpOnly:true});
//         return res.status(200).send({
//             accessToken:token,
//             message:"Successful Login", 
//             success:true,
//             data: admin
//         })
//     }
// }

// export default  AdminController;

import {Request,Response,NextFunction, Router} from 'express';
import NotAuthorisedTokenException from '../Exceptions/NotAuthorisedException';
import Controller from '../interfaces/controller.interface';
import RequestWithAdmin from '../interfaces/requestWithAdmin';
import authMiddleware from '../middleware/auth.middleware';
import Admin from '../model/admin.model';
import UsersNotFoundException from '../Exceptions/UsersNotFoundException';
import UserNotFoundException from '../Exceptions/UserNotFoundException'
import SavingNewUserFailedException from '../Exceptions/SavingNewUserFailedException';

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
        console.log('request....', request.body.username)

        const newAdmin =  this.admin.create({
            username:request.body.username,
            password:request.body.password,
            isAdmin:request.body.isAdmin
        });

        if(newAdmin) return response.status(201).send(newAdmin);
        next(new SavingNewUserFailedException('admin'))
    }
}

export default AdminController;
