import mongoose from "mongoose";
import { ChatRoom } from "../models/chat.model";
import {
  IChatRoom,
  IMessage
} from "../types/chat.types";
export const createChatRoom = async (user1Id: string, user2Id: string): Promise<IChatRoom> => {
    const existingRoom = await ChatRoom.findOne({
        participants: { $all: [user1Id, user2Id] },
    });

    if (existingRoom) return existingRoom;

    const room = await ChatRoom.create({ participants: [user1Id, user2Id], messages: [] });
    return room;
};

export const addMessage = async (
    roomId: string,
    senderId: string,
    text: string
): Promise<IChatRoom> => {
    const message: IMessage = { senderId, text, isRead: false };

    const room = await ChatRoom.findByIdAndUpdate(
        roomId,
        { $push: { messages: message } },
        { new: true }
    );

    if (!room) throw new Error("Chat room not found");
    return room;
};

export const editMessage = async (
    roomId: string,
    messageId: string,
    newText: string
): Promise<IChatRoom> => {
    const room = await ChatRoom.findById(roomId);
    if (!room) throw new Error("Chat room not found");

    const message = room.messages.find(
        msg => msg._id?.toString() === messageId
    ); if (!message) throw new Error("Message not found");

    message.text = newText;
    message.updatedAt = new Date();
    await room.save();
    return room;
};

export const deleteMessage = async (
    roomId: string,
    messageId: string
): Promise<IChatRoom> => {
    const room = await ChatRoom.findByIdAndUpdate(
        roomId,
        { $pull: { messages: { _id: messageId } } },
        { new: true }
    );

    if (!room) throw new Error("Chat room not found");
    return room;
};

export const setMessageRead = async (
    roomId: string,
    messageId: string
): Promise<IChatRoom> => {
    const room = await ChatRoom.findById(roomId);
    if (!room) throw new Error("Chat room not found");
    console.log(room);

    const message = room.messages.find(
        msg => msg._id?.toString() === messageId
    ); if (!message) throw new Error("Message not found");

    message.isRead = true;
    message.updatedAt = new Date();

    await room.save();
    return room;
};
// Get chat room by ID
export const getChatRoom = async (roomId: string): Promise<IChatRoom> => {
    const room = await ChatRoom.findById(roomId);
    if (!room) throw new Error("Chat room not found");
    return room;
};
