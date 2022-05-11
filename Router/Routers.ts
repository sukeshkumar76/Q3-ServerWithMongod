import express, { Router } from "express";
import playerModel from '../Models/player'
import multer from "multer";
const route=Router();

const upload = multer({ dest: 'uploads/' })

route.get('/',async(req:express.Request,res:express.Response)=>{
  try {
    const result= await playerModel.find()
    res.json(result);

  } catch (error) {
      res.json(error);
  }
})
route.post('/',async (req,res)=>{
//rushingyards,touchdowns,sacks,madeGoals,missedGoals,catches,

   // const {firstname,lastname,dob,position,salary,rushingyards,touchdowns,sacks,madeGoals,missedGoals,catches,
   // }=JSON.parse(req.body.data);

    try {
        const PlayerModel=new playerModel(req.body.data);
        const newPlayer= await PlayerModel.save();
        res.json(newPlayer);
        console.log(newPlayer);
        } catch (error) {
            console.log("Error: "+error);
           res.json(error); 
        }  
})

route.put('/:id',upload.single('image'),async(req:express.Request,res:express.Response)=>{
    const {firstname,lastname,dob,position,salary}=JSON.parse(req.body.data);
    
    const image=req.file?.filename;

    try {
        const PlayerModel={firstname, lastname, dob, position,salary ,image};        
        const newPlayer= await playerModel.updateOne({_id:req.params.id},PlayerModel);
        res.json(newPlayer);
        } catch (error) {
            console.log("Error: "+error);
           res.json(error); 
        }  
    
})
route.delete('/:id',async(req:express.Request,res:express.Response)=>{
    try {
      await playerModel.remove();

        res.json({message:"successful"})
    } catch (err) {
        res.status(500).json({err})
    }
    
})

export default route;
