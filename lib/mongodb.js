import mongoose from "mongoose";
const uri = process.env.MONGODB_URI;

if(!uri)
{
    throw new Error("Please define the mongodb uri env varibles")
}
const connect = async() =>{
   const connectionState = mongoose.connection.readyState;

   if(connectionState===1)
   {
    console.log("connection already there")
    return;
   }
   if(connectionState===2)
   {
    console.log("connecting...")
   }
  try{
    mongoose.connect(uri,{
      dbName:'GetCeramics',
    })
    console.log("connected..")
  }
  catch(error)
  {
    console.log("Error in connection to database",error)
    throw new Error("Error connection to database",error)
  }
}
export default connect;
