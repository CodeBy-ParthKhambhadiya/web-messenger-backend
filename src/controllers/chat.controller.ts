import { FastifyRequest, FastifyReply } from "fastify";
import {
  createChatRoom,
  addMessage,
  editMessage,
  deleteMessage,
  setMessageRead,
  getChatRoom,
} from "../services/chat.service";

// Create private chat room
export const createRoomController = async (req: FastifyRequest<{ Body: { user1Id: string; user2Id: string } }>, reply: FastifyReply) => {
  try {
     const user1Id = req.user.id; // current logged-in user from middleware
    const user2Id = req.body.user2Id;
    const room = await createChatRoom(user1Id, user2Id);
    reply.send({ success: true, data: room });
  } catch (err: any) {
    reply.status(400).send({ success: false, message: err.message });
  }
};

// Add message
export const addMessageController = async (req: FastifyRequest<{ Body: { roomId: string; senderId: string; text: string } }>, reply: FastifyReply) => {
  try {
    const senderId = req.user.id; // ✅ current logged-in user from middleware
    const { roomId, text } = req.body;

    const room = await addMessage(roomId, senderId, text);

    reply.send({ success: true, data: room });
  } catch (err: any) {
    reply.status(400).send({ success: false, message: err.message });
  }
};

// Edit message
export const editMessageController = async (req: FastifyRequest<{ Body: { roomId: string; messageId: string; text: string } }>, reply: FastifyReply) => {
  try {
    const room = await editMessage(req.body.roomId, req.body.messageId, req.body.text);
    reply.send({ success: true, data: room });
  } catch (err: any) {
    reply.status(400).send({ success: false, message: err.message });
  }
};

// Delete message
export const deleteMessageController = async (req: FastifyRequest<{ Body: { roomId: string; messageId: string } }>, reply: FastifyReply) => {
  try {
    const room = await deleteMessage(req.body.roomId, req.body.messageId);
    reply.send({ success: true, data: room });
  } catch (err: any) {
    reply.status(400).send({ success: false, message: err.message });
  }
};

// Set message read
export const setMessageReadController = async (req: FastifyRequest<{ Body: { roomId: string; messageId: string } }>, reply: FastifyReply) => {
  try {
    const room = await setMessageRead(req.body.roomId, req.body.messageId);
    reply.send({ success: true, data: room });
  } catch (err: any) {
    reply.status(400).send({ success: false, message: err.message });
  }
};

// Get chat room
export const getChatRoomController = async (req: FastifyRequest<{ Params: { roomId: string } }>, reply: FastifyReply) => {
  try {
    const room = await getChatRoom(req.params.roomId);
    reply.send({ success: true, data: room });
  } catch (err: any) {
    reply.status(400).send({ success: false, message: err.message });
  }
};
