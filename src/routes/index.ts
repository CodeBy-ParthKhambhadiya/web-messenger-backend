import { FastifyInstance } from "fastify";
import authRoutes from "./auth.routes";
// import userRoutes from "./user.routes";
import chatRoutes from "./chat.routes";

export default async function apiIndex(fastify: FastifyInstance) {
  // Child route groups
  fastify.register(authRoutes, { prefix: "/auth" });
  // fastify.register(userRoutes, { prefix: "/users" });
  fastify.register(chatRoutes, { prefix: "/chat" });
}
