
import {Request} from 'express';
import { IAdmin } from '../admin/admin.interface';


interface RequestWithAdmin extends Request{
    admin:IAdmin
}

export default RequestWithAdmin