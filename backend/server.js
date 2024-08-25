import express from 'express';
import dbcon from './dbConfig/db.js';
import dotenv from 'dotenv';
import routes from './routes/user.routes.js';
import cors from "cors"
import bodyParser from 'body-parser';

dotenv.config();
const app = express();

// mongodb
dbcon();

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json());
app.use(cors());
app.use('/user',routes);

app.listen(3000,()=>{
    console.log("Server Created");    
})