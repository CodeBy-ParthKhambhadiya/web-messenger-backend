import mongoose, { Schema, Document, Types } from "mongoose";
import {
  IChatRoom,
  IMessage
} from "../types/chat.types";

// Mongoose schema for messages
const MessageSchema = new Schema<IMessage>(
    {
        senderId: { type: String, required: true },
        text: { type: String, required: true },
        isRead: { type: Boolean, default: false },
    },
    { timestamps: true }
);

// Mongoose schema for chat rooms
const ChatRoomSchema = new Schema<IChatRoom>(
    {
        participants: { type: [String], required: true }, // two user IDs for private chat
        messages: [MessageSchema],
    },
    { timestamps: true }
);

// Mongoose model
export const ChatRoom = mongoose.model<IChatRoom>("ChatRoom", ChatRoomSchema);
