import mongoose from "mongoose";
const Schema = mongoose.Schema;
//const ObjectId = Schema.ObjectId;

const playerModel = new Schema({
  firstname: String,
  lastname: String,
  dob: String,
  position:String,
  salary:String,
  rushingyards:Number,
  touchdowns:Number,
  sacks:Number,
  madeGoals:Number,
  missedGoals:Number,
  catches:Number,
  
});
export default mongoose.model('playerModel',playerModel);