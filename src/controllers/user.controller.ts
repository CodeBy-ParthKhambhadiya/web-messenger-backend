import { FastifyRequest, FastifyReply } from "fastify";
import { updateUserProfile, resetUserPassword, getAllUsers } from "../services/user.service";

// Update profile
export const updateProfileController = async (
  req: FastifyRequest<{ Body: { avatar?: string; name?: string; email?: string; mobile?: string } }>,
  reply: FastifyReply
) => {
  try {
    const userId = req.user.id; // current logged-in user
    const updatedUser = await updateUserProfile(userId, req.body);
    reply.send({ success: true, data: updatedUser });
  } catch (err: any) {
    reply.status(400).send({ success: false, message: err.message });
  }
};

// Reset password
export const resetPasswordController = async (
  req: FastifyRequest<{ Body: { oldPassword: string; newPassword: string } }>,
  reply: FastifyReply
) => {
  try {
    const userId = req.user.id; // current logged-in user
    const updatedUser = await resetUserPassword(userId, req.body.oldPassword, req.body.newPassword);
    reply.send({ success: true, message: "Password updated successfully", data: updatedUser });
  } catch (err: any) {
    reply.status(400).send({ success: false, message: err.message });
  }
};

// Get all users
export const getAllUsersController = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const users = await getAllUsers();
    reply.send({ success: true, data: users });
  } catch (err: any) {
    reply.status(400).send({ success: false, message: err.message });
  }
};
