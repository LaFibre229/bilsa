// app/api/auth/register/route.js
import { connectDb } from "@/lib/config/dbConnect";
import User from "@/lib/models/User.model";
import { comparePassword } from "@/lib/utils/hashPassword";
import generateToken from "@/lib/utils/generateToken";
import { NextResponse } from "next/server";


// @desc  Auth user
// @access Public
// @route POST/api/auth/login

export async function POST(req){
     await connectDb();
    const {email , password} = await req.json();
    try {
        // Check user
    const user = await User.findOne({email})
      
    if(user && await comparePassword(password, user.password)){
       
      
      
      const response = NextResponse.json(
        {
          message: "Successfully connected",
          token : null,
          user: {
            id: user._id,
            firstname: user.firstname,
            surname: user.surname,
            email: user.email,
            role : user.role,

          },
        },
        { status: 200 }
      );

      // Ajoute le cookie JWT
  const token = generateToken(user._id, user.role, response);
  const body = await response.json();
    body.token = token;

    return NextResponse.json(body, {
          status: 200,
          headers: response.headers,
        });


    }else{
        return NextResponse.json({
            message : "Incorrect email or password",

        },
    {status : 401}
)
    }
        
    } catch (error) {
        return NextResponse.json({
              message : "Error while loging",

               error: error.message 
            },
        {status : 500}
        );
    }
    
    

}