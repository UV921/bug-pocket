//this file is for authentication related functions and utilities
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
//function to hash password
export async function hashPassword(password: string): Promise<string> {
    const saltround=10;
    const hashedPassword=await bcrypt.hash(password,saltround);
    return hashedPassword;
}
//function to compare password 
//we have 2 password one is passoerd which is done by user and another in db which is hash
export async function comaparePassword(password:string,hashedPassword:string):Promise<boolean>{
    return await bcrypt.compare(password,hashedPassword);
}

//fucntion to generate jwt token 
//before tho
export function generateToken(payload:object,expiresIn:jwt.SignOptions["expiresIn"]):string{
    const secret=process.env.JWT_SECRET_KEY as string;
    return jwt.sign(payload,secret,{expiresIn});
}
// for verifying the token
export function verifyToken(token:string):object |null{
    const secret=process.env.JWT_SECRET_KEY as string;
    try{
        const decoded =jwt.verify(token,secret);
        return decoded as object;

    }
    catch(error){
        console.error("Invalid token",error);
        return null;
    }

}


