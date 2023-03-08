import mongoose from "mongoose";
//Create interface User
export interface IUser {
    uid?: string;
    fullName: string;
    email: string;
    password: string;
    deleted: boolean;
}
//Create Schema User
const UsersSchema = new mongoose.Schema<IUser>({
    fullName   : { type: String,default:''},
    email   : { type: String, required: true, unique: true },
    password: { type: String, required: true },
    deleted: { type: Boolean, default: false },
}, {
    timestamps: true,
    versionKey: false
});


//Create model User
export const User = mongoose.model<IUser>("Users", UsersSchema);
