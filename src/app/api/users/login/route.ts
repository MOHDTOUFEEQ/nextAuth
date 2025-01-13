import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";


connect()

export async function POST(request:NextResponse) { 
    try {
        const reqBody = await request.json()
        const {email, password} = reqBody

        console.log(reqBody);

        //check if user already exists
        const user = await User.findOne({email})
        if (!user) {
            return NextResponse.json({error: "user already exists"}, {status: 500})
        }

        const validPassword = await bcryptjs.compare(password, user.password)
        if(!validPassword){
            return NextResponse.json({error: "Invalid password"}, {status: 400})
        }console.log(user);
        
        //create token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }
        //create token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"})
        if(token){
            console.log(token);
        }
        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        })
        response.cookies.set("token", token, {
            httpOnly: true, 
            
        })
        return response;

    } catch (error) {
        return NextResponse.json({error}, {status: 500})
    }
}   