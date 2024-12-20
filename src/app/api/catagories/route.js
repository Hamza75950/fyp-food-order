import { Catagory } from "../../models/Catagory"
import mongoose from "mongoose";
import { isAdmin } from "../auth/[...nextauth]/route";

export async function POST(req){
    mongoose.connect(process.env.MONGO_URL);
    const {name} = await req.json();
    if(await isAdmin()){
        const catagoryDoc = await Catagory.create({name});
        return Response.json(catagoryDoc);

    }
    else{
        return Response.json({});
    }
}

export async function PUT(req){
    mongoose.connect(process.env.MONGO_URL);
    const {_id,name} = await req.json();
    if(await isAdmin()){
        await Catagory.updateOne({_id},{name});

    }
    return Response.json(true);
}

export async function GET(){
    mongoose.connect(process.env.MONGO_URL);
    return Response.json(
        await Catagory.find()
    );
}

export async function DELETE(req){

    mongoose.connect(process.env.MONGO_URL);
    const url = new URL(req.url);
    const _id = url.searchParams.get('_id')
    if(await isAdmin()){
        await Catagory.deleteOne({_id});
    }
    return Response.json(true)

}