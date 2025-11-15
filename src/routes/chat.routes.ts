import { FastifyInstance } from "fastify";
import {
  createRoomController,
  addMessageController,
  editMessageController,
  deleteMessageController,
  setMessageReadController,
  getChatRoomController,
} from "../controllers/chat.controller";
import { authenticate } from "../middlewares/auth.middleware";

export default async function chatRoutes(fastify: FastifyInstance) {
  fastify.post("/room", { preHandler: [authenticate] }, createRoomController);

  fastify.get("/room/:roomId", { preHandler: [authenticate] }, getChatRoomController);

  fastify.post("/message", { preHandler: [authenticate] }, addMessageController);

  fastify.put("/message/edit", { preHandler: [authenticate] }, editMessageController);

  fastify.delete("/message", { preHandler: [authenticate] }, deleteMessageController);

  fastify.put("/message/read", { preHandler: [authenticate] }, setMessageReadController);
}
