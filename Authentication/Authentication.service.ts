
import  bcrypt from 'bcrypt';
import  jwt from 'jsonwebtoken';
import AdminWithUsernameExists from '../Exceptions/AdminWithUsernameExistsException';
import DataStoredInToken from '../interfaces/dataStoredInToken';
import TokenData from '../interfaces/tokenData.interface';
import CreateAdminDto from '../admin/admin.dto';
import {IAdmin} from '../admin/admin.interface';
import Admin from '../model/admin.model';


class AuthenticationService{
    public admin = Admin;

    public async register(adminData:CreateAdminDto){
        if(await this.admin.findOne({username:adminData.username})) throw new AdminWithUsernameExists(adminData.username);
        const hashedPassword = await bcrypt.hash(adminData.password,10);
        const admin = await this.admin.create({
            ...adminData,
            password:hashedPassword
        });

        const tokenData = this.createToken(admin);
        const cookie = this.createCookie(tokenData)
        return {admin, cookie}
    }


    public createCookie(tokenData:TokenData){
        return `Authorisation=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
    }


    public createToken(admin:IAdmin):TokenData  {
        const expiresIn = 60*60;
        const secret = process.env.Secret;
        const dataStoredInToken:DataStoredInToken = {
            _id:admin._id,  
        };

        return{
            expiresIn,
            token:jwt.sign(dataStoredInToken,"swsh23hjddnns",{expiresIn})
        }
    }
}

export default AuthenticationService;