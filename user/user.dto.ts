import {IsOptional,IsString,ValidateNested} from 'class-validator';
import CreateAddressDto from './address.dto';


class CreateUserDto{
    @IsString()
     public email:string;

    @IsOptional()
    @ValidateNested()
    public address: CreateAddressDto

    @IsString()
    public phone: string
}

export default CreateUserDto;