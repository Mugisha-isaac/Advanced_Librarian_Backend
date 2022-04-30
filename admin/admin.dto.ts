
import {IsString} from 'class-validator';

class CreateAdminDto{
    @IsString()
    username:string

    @IsString()
    password:string

    @IsString()
    isAdmin:string
}

export default CreateAdminDto;