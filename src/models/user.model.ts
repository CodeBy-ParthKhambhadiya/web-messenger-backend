import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "../types/auth.types";

const UserSchema = new Schema<IUser>(
  {
    avatar: { type: String, default: "" },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>("User", UserSchema);
