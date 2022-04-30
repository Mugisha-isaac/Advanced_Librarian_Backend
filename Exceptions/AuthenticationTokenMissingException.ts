import HttpException from "./HttpException";

class AuthenticationTokenMissingException extends HttpException {
    constructor(){
        super(401, 'Authentication token is Missing');
    }
}

export default AuthenticationTokenMissingException;