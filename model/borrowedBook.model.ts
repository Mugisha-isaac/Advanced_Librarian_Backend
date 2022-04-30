

import mongoose from 'mongoose';
import { EbookCategory, EbookStatus } from '../enums/Ebook';

const Schema = mongoose.Schema;

const bookSchema = new Schema({
    isbn:{
       type:String,
       required:true
    },
    name:{
        type:String,
        required:true
    },
    borrower:{
     type:String,
     required:true
    },
    borrowedDate:{
      type:Date,
      required:true
    },
    status:{
        type:String,
        required: true
    }

}, {timestamps:true});

export default mongoose.model('BorrowedBook',bookSchema);