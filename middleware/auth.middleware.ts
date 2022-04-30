import { NextFunction,Response } from "express";
import * as jwt from 'jsonwebtoken';
import AuthenticationTokenMissing from "../Exceptions/AuthenticationTokenMissingException";
import WrongAuthenticationTokenException from "../Exceptions/WrongAuthenticationTokenException";
import DataStoredInToken from "../interfaces/dataStoredInToken";
import Admin from '../model/admin.model';
import { RequestWithAdmin } from "../interfaces/requestWithAdmin";


const authMiddleware = async(req:RequestWithAdmin,res:Response,next:NextFunction) =>{
     const token = req.header('auth');
     if(token){
         const secret = process.env.Jwt_Secret;

         try{
             const verificationResponse = jwt.verify(token,secret) as DataStoredInToken;
             const id = verificationResponse._id;
             const admin:any = Admin.findOne({_id:id});

             if(admin){
                 req.admin = admin;
                 next();
             }  
             next( new WrongAuthenticationTokenException());
         }
         catch(error){
             next(new AuthenticationTokenMissing)
         }
     }
}

export default authMiddleware;