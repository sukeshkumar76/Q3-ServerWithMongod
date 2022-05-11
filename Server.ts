import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import Router from './Router/Routers';


//connect to db

mongoose.connect('mongodb://127.0.0.1:27017/footballteam');
const db=mongoose.connection;
db.on('error',(error)=>console.error("db error"+error));
db.once('open', ()=>console.log("db connectd"));

//import multer from 'multer'
const App=express();
App.use(cors());
App.use(express.json());

//routs
App.use("/",Router);

const port= process.env.PORT||2000;
App.listen(port,()=>{
    console.log(`listening at port ${port}`); 
})

