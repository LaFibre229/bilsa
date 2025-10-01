import mongoose from "mongoose";



const AccountSchema = new mongoose.Schema({
    userId : {type : mongoose.Schema.Types.ObjectId, ref : "User", required : true},
    statut : {type : String, enum : ["active", "inactive","suspended"], default : "inactive" },
    iban : {type : String, unique : true, required : true},
   accountNumber: { type: String, unique: true, required: true },
    currency : {type : String, default : "EUR"},
    balance : {type : Number, default : 0},
    plan : {type : String , enum : ["free", "move", "pro"], default : "free" },
     pendingPlan: { type: String, enum: ["free", "move", "pro"], default: null },
     resetPasswordToken: {
  type: String,
  default: null,
},

resetPasswordExpire: {
  type: Date,
  default: null,
},

}, {timestamps : true})

export default mongoose.models.Account || mongoose.model("Account",AccountSchema);