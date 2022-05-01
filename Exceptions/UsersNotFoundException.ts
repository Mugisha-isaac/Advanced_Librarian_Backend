import HttpException from "./HttpException";


class UsersNotFoundException extends HttpException{
    constructor(){
        super(404,'Users not found');
    }
}

export default UsersNotFoundException;