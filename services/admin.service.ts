import Admin from '../model/admin.model';
import PasswordUtils from "../utils/password";

class AdminServices{
    async createNewAdmin(username:string,password:string, isAdmin:string){
        const hashedPassword = await PasswordUtils.hashPassword(password);
        const admin = new Admin();
        admin.username = username
        admin.password = hashedPassword
        admin.isAdmin = isAdmin
        admin.save()
        return admin
    }

    async Login(username:string,password:string){
        const userByUsername = await Admin.findOne({username:username});
        if(!userByUsername) return false;
        const dbPassword = userByUsername.password;
        const validuser = PasswordUtils.comparePassword(password,dbPassword);
        if(!validuser) return false;
        return userByUsername ;
    }
}

export default new  AdminServices;  