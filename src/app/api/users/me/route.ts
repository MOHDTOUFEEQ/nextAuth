import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect()


export async function GET(request: NextRequest){
    try {
        const id = getDataFromToken(request)
        const user = await User.findOne({"_id": id}).select("-password");
        return NextResponse.json({
            message: "User found",
            success: true,
            data: user
        })
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500})

    }
}

