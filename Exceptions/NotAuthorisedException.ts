import HttpException from '../Exceptions/HttpException';

class NotAuthorisedExceptions extends HttpException {
    constructor(){
        super(403,"You're not authorised");
    }
}

export default NotAuthorisedExceptions;