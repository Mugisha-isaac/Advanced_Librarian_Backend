import HttpException from "./HttpException"


class SavingNewItemFailedException extends HttpException{
    constructor(type:string){
        super(400, `Failed to save the new ${type}`)
    }
}

export default SavingNewItemFailedException;