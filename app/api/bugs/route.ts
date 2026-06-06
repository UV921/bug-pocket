import { NextRequest,NextResponse } from "next/server"
import { Prisma } from "@/lib/generated/prisma/client";
import { Schema } from "inspector/promises";
//create bug route 
//first take the data 
//validate the data 
//then perofm any business logic and send the response 
//acess token

export async function POST(request:NextRequest){
    const acessToken=request.cookies.get("acessToken");
    if(!acessToken){
        return NextResponse.json({meassage:"Unauthorized"},{status:401})
    }

    const data=await request.json();
    
   
    

    
}