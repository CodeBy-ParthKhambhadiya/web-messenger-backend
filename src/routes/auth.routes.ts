import { FastifyInstance } from "fastify";
import {
  registerController,
  loginController,
  forgotPasswordController,
} from "../controllers/auth.controller";

export default async function authRoutes(fastify: FastifyInstance) {
  fastify.post("/register", registerController);
  fastify.post("/login", loginController);
  fastify.post("/forgot-password", forgotPasswordController);
}
