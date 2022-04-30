import mongoose from "mongoose";
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    isbn:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    publisher:{
        type:String,
        required:true
    },
    publicationDate:{
        type:Date,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    }
},{timestamps:true})

export default mongoose.model('Book', bookSchema);