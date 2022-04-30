import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ordersSchema = new Schema({
    orderDate:{
        type:Date,
        required: true
    },
    customer:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    deliveryDate:{
        type:Date,
        required:true
    }
},{timestamps:true})

export default mongoose.model('Order',ordersSchema);