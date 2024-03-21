import { NextResponse } from "next/server"
import connect from "@/lib/mongodb"
import Item from "@/lib/modals/item"
import { Types } from "mongoose";

const ObjectId = require("mongoose").Types.ObjectId;

export const GET = async(request:Request) =>{
    try{
        const {searchParams} = new URL (request.url)
        const itemId = searchParams.get("itemId")

        await connect();
        if(!itemId || !Types.ObjectId.isValid(itemId))
        {
            return new NextResponse(JSON.stringify({message: "itemid is required or itemid is not valid"}),{status:400})
        }
        const item = await Item.findById(new Types.ObjectId(itemId))
        if(!item)
        {
            return new NextResponse(JSON.stringify({message: "item not found"}),{status:400})
        }
        return new NextResponse(JSON.stringify({message: "item found",item:item}),{status:200})
    }
    catch(error){
        console.log(error);
        return new NextResponse("Error in fetching user" + error,{status: 500})
    }
}