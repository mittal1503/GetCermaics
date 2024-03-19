import { NextResponse } from "next/server"
import connect from "@/lib/mongodb"
import Item from "@/lib/modals/item"
import { Types } from "mongoose";

const ObjectId = require("mongoose").Types.ObjectId;

export const GET = async() =>{
   try{
        await connect();
        const items = await Item.find();
        return new NextResponse(JSON.stringify(items),{status: 200})
   }
   catch(error){
       console.log(error);
       return new NextResponse("Error in fetching user" + error,{status: 500})
   }

}

export const POST = async(request:Request) =>
{
   try{
        const body = await request.json();
        await connect();
        const newitem = new Item(body);
        await newitem.save();
        return new NextResponse(JSON.stringify({message: "items is added successfully", item:newitem }),{status: 201})
   }
   catch(error)
   {
    return new NextResponse("error in creating item"+error,{status: 500})
   }
}

export const PATCH= async(request:Request) =>
{
 try{
     const body = await request.json();
     const {itemId,itemName} = body;
     await connect();

     if(!itemName || !itemId)
     {
       return new NextResponse(JSON.stringify({message: "invalid itemname or id are required"}),{status:400})
     }

     if(!Types.ObjectId.isValid(itemId))
     {
      return new NextResponse(JSON.stringify({message: "invalid itemid"}),{status:400})
     }

     const updatedItem = await Item.findByIdAndUpdate(
     { _id: new ObjectId(itemId)},
      {name: itemName},
      {new:true}
     )
     if(!updatedItem)
     {
      return new NextResponse(JSON.stringify({message: "item not updated successfully"}),{status:400})

     }
     return new NextResponse(JSON.stringify({message: "item updated successfully",item:updatedItem}),{status:200})

 }
 catch(error)
 {
   return new NextResponse("error in updating item"+error,{status: 500})
 }
}

export const DELETE = async (request:Request)=>{
try{
  const {searchParams} = new URL(request.url)
  const itemId = searchParams.get("itemId")
  console.log("itemId: " + itemId)
  if(!itemId)
  {
    return new NextResponse(JSON.stringify({message: "itemid is required"}),{status:400})
  }
  if(!Types.ObjectId.isValid(itemId))
  {
   return new NextResponse(JSON.stringify({message: "Invalid itemid"}),{status:400})
  }
  await connect();
  const deletedItem = await Item.findByIdAndDelete(new Types.ObjectId(itemId))
  if(!deletedItem)
  {
    return new NextResponse(JSON.stringify({message: "item not found"}),{status:400})
  }
  return new NextResponse(JSON.stringify({message: "item deleted successfully",item:deletedItem}),{status:200})
}
catch(error)
{
  return new NextResponse("error in deleting item"+error,{status: 500})
}}