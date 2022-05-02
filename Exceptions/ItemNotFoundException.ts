import HttpException from "./HttpException";

class ItemNotFoundException extends HttpException {
    constructor(type:string,id:string){
        super(404,`${type} with ${id} not found`)
    }
}

export default ItemNotFoundException;