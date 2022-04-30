
import {Request} from 'express';
import { IAdmin } from '../admin/admin.interface';


export interface RequestWithAdmin extends Request{
    admin:IAdmin
}