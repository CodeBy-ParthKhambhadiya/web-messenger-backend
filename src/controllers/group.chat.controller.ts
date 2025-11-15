import { FastifyRequest, FastifyReply } from "fastify";
import {
  createGroupChat,
  addGroupMember,
  removeGroupMember,
  addGroupMessage,
  editGroupMessage,
  markGroupMessageRead,
  getGroupChat
} from "../services/group.chat.service";

// Create group
export const createGroupController = async (req: FastifyRequest<{ Body: { groupName: string; members: string[]; avatar?: string } }>, reply: FastifyReply) => {
  try {
    const adminId = req.user.id;
    const { groupName, members, avatar } = req.body;
    const group = await createGroupChat(adminId, groupName, members, avatar);
    reply.send({ success: true, data: group });
  } catch (err: any) {
    reply.status(400).send({ success: false, message: err.message });
  }
};

// Add member
export const addGroupMemberController = async (req: FastifyRequest<{ Body: { groupId: string; memberId: string } }>, reply: FastifyReply) => {
  try {
    const { groupId, memberId } = req.body;
    const group = await addGroupMember(groupId, memberId);
    reply.send({ success: true, data: group });
  } catch (err: any) {
    reply.status(400).send({ success: false, message: err.message });
  }
};

// Remove member
export const removeGroupMemberController = async (req: FastifyRequest<{ Body: { groupId: string; memberId: string } }>, reply: FastifyReply) => {
  try {
    const { groupId, memberId } = req.body;
    const group = await removeGroupMember(groupId, memberId);
    reply.send({ success: true, data: group });
  } catch (err: any) {
    reply.status(400).send({ success: false, message: err.message });
  }
};

// Add message
export const addGroupMessageController = async (req: FastifyRequest<{ Body: { groupId: string; text: string } }>, reply: FastifyReply) => {
  try {
    const senderId = req.user.id;
    const { groupId, text } = req.body;
    const group = await addGroupMessage(groupId, senderId, text);
    reply.send({ success: true, data: group });
  } catch (err: any) {
    reply.status(400).send({ success: false, message: err.message });
  }
};

// Edit message
export const editGroupMessageController = async (req: FastifyRequest<{ Body: { groupId: string; messageId: string; text: string } }>, reply: FastifyReply) => {
  try {
    const { groupId, messageId, text } = req.body;
    const group = await editGroupMessage(groupId, messageId, text);
    reply.send({ success: true, data: group });
  } catch (err: any) {
    reply.status(400).send({ success: false, message: err.message });
  }
};

// Mark message read
export const markGroupMessageReadController = async (req: FastifyRequest<{ Body: { groupId: string; messageId: string } }>, reply: FastifyReply) => {
  try {
    const userId = req.user.id;
    const { groupId, messageId } = req.body;
    const group = await markGroupMessageRead(groupId, messageId, userId);
    reply.send({ success: true, data: group });
  } catch (err: any) {
    reply.status(400).send({ success: false, message: err.message });
  }
};

// Get group
export const getGroupController = async (req: FastifyRequest<{ Params: { groupId: string } }>, reply: FastifyReply) => {
  try {
    const { groupId } = req.params;
    const group = await getGroupChat(groupId);
    reply.send({ success: true, data: group });
  } catch (err: any) {
    reply.status(400).send({ success: false, message: err.message });
  }
};
