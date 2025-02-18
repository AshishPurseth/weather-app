import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
    username:string
    password:string
    cities:string[]
    updatedAt:Date
    createdAt:Date
}

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true },
  password: { type: String, required: true, unique: true },
  cities: {type: [String]}
},{
    timestamps:true
});

const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export { User };