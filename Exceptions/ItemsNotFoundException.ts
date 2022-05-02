import HttpException from "./HttpException";


class ItemsNotFoundException extends HttpException{
    constructor(type:string){
        super(404,`${type} not found`);
    }
}

export default ItemsNotFoundException;