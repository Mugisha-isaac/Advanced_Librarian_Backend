import * as bcrypt from 'bcrypt';

class PasswordUtils{
      comparePassword = (userPassword:string, dbPassword:string) =>{
        return bcrypt.compareSync(userPassword,dbPassword);
    
    }
    
    hashPassword = async(userPassword:string)=>{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(userPassword,salt);
        return hashedPassword;
    }
}

export default new PasswordUtils;

