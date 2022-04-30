import User from '../model/user.model';

class UserServices{
   async create(email:string, name:string, address:string, phone:number){
     const user = new User();
     user.email = email
     user.name = name
     user.address = address
     user.phone = phone
     user.save()
     return user;
    }

   async delete(id:string){
     const user = await User.deleteOne({_id:id})
     if(!user) return false
     return true
   } 

   async getAllUser(){
     const users = await User.find();
     return users;
   }
}

export default new UserServices;