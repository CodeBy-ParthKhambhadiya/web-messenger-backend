import bcrypt from "bcryptjs";
import { User } from "../models/user.model";
import { IUser } from "../types/auth.types";

// Update profile (avatar, name, email, mobile)
export const updateUserProfile = async (
  userId: string,
  updateData: Partial<Pick<IUser, "avatar" | "name" | "email" | "mobile">>
): Promise<IUser | null> => {
  const user = await User.findByIdAndUpdate(userId, updateData, { new: true });
  if (!user) throw new Error("User not found");
  return user;
};

// Reset password (oldPassword → newPassword)
export const resetUserPassword = async (
  userId: string,
  oldPassword: string,
  newPassword: string
): Promise<IUser> => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) throw new Error("Old password is incorrect");

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;
  await user.save();

  return user;
};
