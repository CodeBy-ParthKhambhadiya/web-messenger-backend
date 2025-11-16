import { FastifyInstance } from "fastify";
import { authenticate } from "../middlewares/auth.middleware";
import { updateProfileController, resetPasswordController, getAllUsersController } from "../controllers/user.controller";

export default async function userRoutes(fastify: FastifyInstance) {
  // Update profile
  fastify.put("/profile", { preHandler: [authenticate] }, updateProfileController);

  // Reset password
  fastify.put("/password/reset", { preHandler: [authenticate] }, resetPasswordController);

  //get all users
  fastify.get("/users", {  preHandler: [authenticate] }, getAllUsersController);

}
