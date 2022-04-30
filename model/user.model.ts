
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
      email:{
          type:String,
          required:true,
          unique:true
      },
      name:{
          type:String,
          required:true,
          max: 15
      },
      address:{
          type:String,
          required:true,
          
      },
      phone:{
          type:String,
          required:true,
      }
});


export default mongoose.model('User', userSchema);