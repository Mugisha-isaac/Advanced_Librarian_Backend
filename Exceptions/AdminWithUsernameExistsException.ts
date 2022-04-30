import HttpException from "./HttpException";

class AdminWithUsernameExists extends HttpException {
    constructor(username:string){
        super(400, `user with ${username} exists`);
    }
}

export default AdminWithUsernameExists;