import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
    username:string
    password:string
    updatedAt:Date
    createdAt:Date
}

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true },
  password: { type: String, required: true, unique: true },
},{
    timestamps:true
});

export const User = mongoose.model("User", UserSchema);