"use server";
import { registerSchema } from "../schemas/auth.schema";
import { prisma } from "../lib/prisma";
import { hashPassword } from "../lib/auth";
import { generateToken } from "../lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { success } from "zod";
export async function register(formdata: FormData) {
  console.log("SERVER ACTION RUNNING");
  const rawData = {
    username: formdata.get("username"),
    password: formdata.get("password"),
    email: formdata.get("email"),
  };

  const validatedData = registerSchema.safeParse(rawData);
  //need improvement here
  if (!validatedData.success) {
    return {
        success: false,
        errors: validatedData.error.issues.map((err) => ({
            field: err.path[0],
            message: err.message
        }))
    };
  }
  const { username, password, email } = validatedData.data;

  //check in the db
  if (await prisma.user.findUnique({ where: { email } })) {
    return {
      success: false,
      errors: [
        {
          field: "email",
          message: "User already exists"
        }
      ]
    };
  }
  //create the user
  //Before this hash the password
  const hashedPassword = await hashPassword(password);
  const user = await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
      email,
    },
  });
  //genrate acess token and refresh token
  const accessToken = generateToken(
    { userId: user.id, email: user.email },
    "15m",
  );
  const refreshToken = generateToken({ userId: user.id }, "7d");
  //set acesss and redresh toekn in cookie
  const cookeiesSet = await cookies();

  cookeiesSet.set("accessToken", accessToken, {
    httpOnly: true,
    secure:
 process.env.NODE_ENV
 === "production",
    sameSite: "lax",
    maxAge: 15 * 60,
    path: "/",
  });
  cookeiesSet.set("refreshToken", refreshToken, {
    httpOnly:true,
    secure:
 process.env.NODE_ENV
 === "production",
    sameSite:"lax",
    maxAge:7*24*60*60,
    path:"/"
  })
  //save the refresh token in db for future use
  console.log("saving refresh toekn")
  await prisma.refreshToken.create({
    data:{
        token:refreshToken,
        userId:user.id,
        expireAt:new Date(Date.now()+7*24*60*60*1000)


    }})
    console.log("refresh toekn saved")


  //first get the data
  //validate the data using zod
  //now have to check via email does the user exist or not
  //if user exist then throw error else create the user
  redirect("/dashboard");
  

  
}