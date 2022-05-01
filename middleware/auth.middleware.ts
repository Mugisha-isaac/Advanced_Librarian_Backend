import { NextFunction,Response } from "express";
import jwt from 'jsonwebtoken';
import AuthenticationTokenMissing from "../Exceptions/AuthenticationTokenMissingException";
import WrongAuthenticationTokenException from "../Exceptions/WrongAuthenticationTokenException";
import DataStoredInToken from "../interfaces/dataStoredInToken";
import Admin from '../model/admin.model';
import  RequestWithAdmin  from "../interfaces/requestWithAdmin";
import { RequestHandlerParams } from "express-serve-static-core";


const authMiddleware = async(req:any,res:Response,next:NextFunction)  =>{

   const cookies = req.cookies;
   if(cookies && cookies.Authorisation){
       const secret = process.env.Secret;
       try{
           const verificationResponse = jwt.sign(cookies.Authorisation, "swsh23hjddnns") as unknown as DataStoredInToken;
           const id = verificationResponse._id;
           const admin = await Admin.findById(id);

           if(admin){
               req.admin = admin;
               next()
           }
           else{
               next(new WrongAuthenticationTokenException());
           }
           
       }
       catch(error){
           next(new WrongAuthenticationTokenException());
       }
   }
   else{
       next(new AuthenticationTokenMissing());
   }
}

export default authMiddleware;
