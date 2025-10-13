import mongoose from "mongoose";


const User = new mongoose.Schema({
// Step 1
    adress: {
      type: String,
      enum: ["woman", "lord", "other"],
      required: true,
    },
    title: {
      type: String,
      enum: ["Dr", "Dr.Dr"],
    },
    firstname: {
      type: String,
      required: true,
      trim: true,
    },
    surname: {
      type: String,
      required: true,
      trim: true,
    },
    birthname: {
      type: String,
      trim: true,
    },
    birthdate: {
      type: String, 
      required: true,
    },
    birthplace: {
      type: String,
      required: true,
      trim: true,
    },
    birthcountry: {
      type: String,
      required: true,
      trim: true,
    },
    nationality: {
      type: String,
      required: true,
      trim: true,
    },

    // Step 2
    postalcode: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    housenumber: {
      type: String,
    },
    dateresidence: {
      type: String, // format "MM.YYYY"
    },

    // Step 3
    profession: {
      type: String,
      required: true,
    },
    otherProfession: {
      type: String,
    },
     password : {
      type : String,
      required : true,
    },
    role : {
       type : String,
       enum : ["admin","user"],
       default : "user"
    },

    // Step 4
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, 
      lowercase: true,
      trim: true,
    },
    isVerified: { type: Boolean, default: false },
    verificationCode: {type : String},
     codeExpires: {type : Date},
     socialSecurityNumber : {type : String }
   
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", User);