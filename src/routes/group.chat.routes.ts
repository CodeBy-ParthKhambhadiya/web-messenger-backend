import { FastifyInstance } from "fastify";
import {
  createGroupController,
  addGroupMemberController,
  removeGroupMemberController,
  addGroupMessageController,
  editGroupMessageController,
  markGroupMessageReadController,
  getGroupController
} from "../controllers/group.chat.controller";
import { authenticate } from "../middlewares/auth.middleware";

export default async function groupChatRoutes(fastify: FastifyInstance) {
  // Create a new group
  fastify.post("/group", { preHandler: [authenticate] }, createGroupController);

  // Add member to group
  fastify.post("/group/member/add", { preHandler: [authenticate] }, addGroupMemberController);

  // Remove member from group
  fastify.post("/group/member/remove", { preHandler: [authenticate] }, removeGroupMemberController);

  // Add message to group
  fastify.post("/group/message", { preHandler: [authenticate] }, addGroupMessageController);

  // Edit message in group
  fastify.put("/group/message/edit", { preHandler: [authenticate] }, editGroupMessageController);

  // Mark message as read
  fastify.put("/group/message/read", { preHandler: [authenticate] }, markGroupMessageReadController);

  // Get group details by ID
  fastify.get("/group/:groupId", { preHandler: [authenticate] }, getGroupController);
}
