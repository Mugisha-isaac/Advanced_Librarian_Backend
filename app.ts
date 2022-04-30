import * as bodyParser from 'body-parser';
import { urlencoded } from 'body-parser';
import * as express from 'express';
import * as mongoose from 'mongoose';
import Controller from './interfaces/controller.interface';
import errorMiddleware from './middleware/error.middleware';


class App{
    public app: express.Application;

    constructor(controllers:Controller[]){
        this.app = express();
    }

    public Listen(){
        this.app.listen(process.env.PORT, ()=>{
            console.log(`app is running on port ${process.env.PORT}`);
        })
    }

    public server(){
        return this.app;
    }

    private initializeMiddlewares(){
        this.app.use(bodyParser.json());
    }

    private initializeErrorHandling(){
        this.app.use(errorMiddleware)
    }

    private initializeControllers(controllers:Controller[]){
        controllers.forEach((controller)=>{
            this.app.use('/', controller.router);
        })
    }
    
    private connectToDatabase(){
        const {
            MONGO_USER,
            MONGO_PASSWORD,
            MONGO_PATH
        } = process.env;

        mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`);
    }
}

export default App;