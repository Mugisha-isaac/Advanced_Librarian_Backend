
import mongoose from "mongoose";
const schema = mongoose.Schema;

const adminSchema = new schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isAdmin:{
        type:String,
        required:true,
        default:"admin"
    }
}, {timestamps:true})

export default mongoose.model("Admin",adminSchema)