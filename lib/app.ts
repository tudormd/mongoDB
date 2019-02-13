import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import * as cors from "cors";

const dotenv = require('dotenv')   
const logger = require('morgan'); 

import { Routes } from "./routes/CoreRoutes"; 

process.env.APP_ENV && dotenv.config({ path: process.env.APP_ENV });
 
class App {

    public app: express.Application;
    public routePrv: Routes = new Routes();
    public mongoUrl: string = 'mongodb://192.168.99.100:27017:27017/my_mongo';  
    

    constructor() { 
        this.app = express();
        this.config(); 
        this.routePrv.routes(this.app);  
        this.mongoSetup();        
    } 

    private config(): void{
        // support application/json type post data
        this.app.use(bodyParser.json());
        this.app.use(logger('dev'));
        this.app.use(cors());
        this.app.set('port', process.env.APP_PORT || 3000);
        this.app.set('secretKey', 'hack');
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

    private mongoSetup(): void{
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl, {useNewUrlParser: true});        
    }

}

export default new App().app;