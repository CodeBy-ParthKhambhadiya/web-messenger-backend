import { User } from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  IRegisterBody,
  ILoginBody,
  IForgotPasswordBody
} from "../types/auth.types";

// -----------------------------------------------------
// Register Service
// -----------------------------------------------------
export const registerService = async (data: IRegisterBody) => {
  const { avatar, name, email, mobile, password } = data;

  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("Email already exists");

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    avatar,
    name,
    email,
    mobile,
    password: hashedPassword,
  });

  return user;
};

// -----------------------------------------------------
// Login Service
// -----------------------------------------------------
export const loginService = async (data: ILoginBody) => {
  const { email, password } = data;

  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid email or password");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid email or password");

  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );

  return { user, token };
};

// -----------------------------------------------------
// Forgot Password Service
// -----------------------------------------------------
export const forgotPasswordService = async (data: IForgotPasswordBody) => {
  const { email, mobile, newPassword } = data;

  const user = await User.findOne({ email, mobile });
  if (!user) throw new Error("User not found");

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  user.password = hashedPassword;
  await user.save();

  return "Password reset successful";
};
