
import {IsString} from 'class-validator'


class LoginDTO{
    @IsString()
    username:string
    @IsString()
    password:string
}

export default LoginDTO;