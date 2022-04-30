
import * as bcrypt from 'bcrypt';
import { Request,Response,NextFunction, Router } from 'express';
import * as jwt from 'jsonwebtoken';
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



    private initializeRoutes(){
        this.router.post(`${this.path}/register`, ValidationMiddleware(CreateAdminDto), this.registration);
    }

    private registration = async(request:Request,response:Response,next:NextFunction) =>{
      const adminData:CreateAdminDto = request.body;
      try{
            const {admin} = await this.authenticationService.register(adminData);
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
                const tokenData = this.CreateToken(admin);  
                response.send(admin);
            }
            else{
                next(new WrongCredentialsException());
            }
        }
        else{
            next(new WrongCredentialsException());
        }
    }
     

    // private Logout = async(request:Request, response:Response)=>{
       
    // }

    private CreateToken(admin:IAdmin):TokenData{
        const expiresIn = 60*60;
        const secret = process.env.Jwt_Secret;
        const dataStoredInToken:DataStoredInToken = {
            _id:admin._id
        };

        return{
            expiresIn,
            token:jwt.sign(dataStoredInToken,secret,{expiresIn})
        }
    }
}


export default AuthenticationController;