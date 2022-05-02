
import bcrypt from 'bcrypt';
import { Request,Response,NextFunction, Router } from 'express';
import  jwt from 'jsonwebtoken';
import WrongCredentialsException from '../Exceptions/WrongCredentialsException';
import Controller from '../interfaces/controller.interface';
import DataStoredInToken from '../interfaces/dataStoredInToken';
import TokenData from '../interfaces/tokenData.interface';
import ValidationMiddleware from '../middleware/validation.middleware';
import CreateAdminDto from '../admin/admin.dto';
import {IAdmin} from '../admin/admin.interface';
import Admin from '../model/admin.model';
import AuthenticationService from './Authentication.service';
import LoginDTO from './LoginDTO';



class AuthenticationController{
    public path = '/auth';
    public router = Router();
    public authenticationService = new AuthenticationService();
    private admin = Admin;


   constructor(){
       this.initializeRoutes();
   }


    private initializeRoutes(){
        this.router.post(`${this.path}/register`, this.registration);
        this.router.post(`${this.path}/login`,  this.LogIn);
        this.router.post(`${this.path}/logout`, this.Logout);
    }

    private registration = async(request:Request,response:Response,next:NextFunction) =>{
      const adminData:CreateAdminDto = request.body;
      try{
            const {admin,cookie} = await this.authenticationService.register(adminData);
            response.setHeader('Set-Cookie', [cookie])
            response.send(admin);
      }
      catch(error){
          next(error);
      }
    }

    private LogIn = async(request:Request,response:Response,next:NextFunction)=>{
        const LoginData:LoginDTO = request.body;
        const admin = await this.admin.findOne({username:LoginData.username});
        if(admin){
            const isPasswordIsMatching = await bcrypt.compare(LoginData.password,admin.get('password',null,{getters:false}));
            if(isPasswordIsMatching){
                const id = admin._id;
                let payload = {id};
                let accessToken = jwt.sign(payload,"swsh23hjddnns",{
                    algorithm: "HS256",
                    expiresIn:86400
                });

                response.cookie('jwt',accessToken,{secure:true,httpOnly:true});
                return response.status(200).send({
                    token: accessToken,
                    message: 'Successful Login'
                })
            }
            else{
                next(new WrongCredentialsException());
            }
        }
        else{
            next(new WrongCredentialsException());
        }
    }
     

    private Logout = async(request:Request, response:Response)=>{
        response.setHeader('Set-Cookie', ['Authorisation=;Max-Age=0']);
        response.send(200);
    }

    private CreateToken(admin:IAdmin):TokenData{
        const expiresIn = 60*60;
        const secret ="swsh23hjddnns";
        const dataStoredInToken:DataStoredInToken = {
            _id:admin._id
        };

        return{
            expiresIn,
            token:jwt.sign(dataStoredInToken,secret,{expiresIn})
        }
    }

    private CreateCookie(tokenData:TokenData){
        return `Authorisation ${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
    }
}


export default AuthenticationController;