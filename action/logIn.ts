//make for the login action 
//took the email ,password
//check in db if user exist or not 
//not exsit and return the error
//if exist then compare the password
//if yes then gernate the acess adn refresh set cookie 
//if not then retun the error or redirect to resgiter page 
"use server"

import { loginSchema } from "@/schemas/auth.schema";
import { prisma } from "@/lib/prisma";
import { comaparePassword ,generateToken} from "@/lib/auth";
import {cookies} from "next/headers"
import { redirect } from "next/navigation";


export async function login(formdata:FormData){
    const rawData={
        email:formdata.get("email"),
        password:formdata.get("password"),
    }
    const validatedData=loginSchema.safeParse(rawData);
    if(!validatedData.success){
        return {
            success:false,
            errors:validatedData.error.issues.map((err)=>({
                field:err.path[0],
                message:err.message
            }))
        }
    }
    const {email,password}=validatedData.data;

    const user =await prisma.user.findUnique({where:{email}})
    if(!user){
        return {
            success:false,
            errors:[
                {
                    field:"email",
                    message:"User not found"
                }
            ]
        }
    }
    const ispassowrdvalid=await comaparePassword(user.password,password);
    if(!ispassowrdvalid){
        return {
            success:false,
            errors:[
                {
                    field:"password",
                    message:"Invalid password"
                }
            ]
        }
    }
    const acessToken=generateToken({userID:user.id,email:user.email},"15m")
    const refreshToken=generateToken({userID:user.id},"7d")

    const cookiesSet=await cookies();
    cookiesSet.set("acesstoken",acessToken,{
        httpOnly:true,
        secure:process.env.NODE_ENV==="production",
        sameSite:"strict",
        maxAge:15*60, //15 min

        path:"/"
        
    


    })
    cookiesSet.set("refreshtoken",refreshToken,{
        httpOnly:true,
        secure:process.env.NODE_ENV==="production",
        sameSite:"strict",
        maxAge:7*24*60*60

    })
    //remove old refresh toekn table and add new one 
    await prisma.refreshToken.deleteMany({
        where:{
            userId:user.id
        }
    })
    //create new refresh token
    await prisma.refreshToken.create({
        data:{
            token:refreshToken,
            userId:user.id,
            expireAt:new Date(Date.now()+7*24*60*60*1000),

        }
    })
    redirect("/dashboard");
    //here to work
    
    
    




}




