import { NextResponse } from "next/server";
import { connectDb } from "@/lib/config/dbConnect";

// @desc   user Logout
// @access Public
// @route POST/api/auth/logout

export async function POST(){
    await connectDb();
     try {
        const response = NextResponse.json({
            message : "Logged out successfuly !"
        },{status : 200})

        response.cookies.set('jwt',"",{
            httpOnly : true,
            secure : process.env.NODE_ENV !== 'development',
            sameSite : 'strict',
            expires : new Date(0)
        })

        return response;
     } catch (error) {
        return NextResponse.json({
            message : "An error occured",
            
        },
        {status : 500},
    {error : error.message}
)
     }
}