import mongoose, { Schema, Document } from "mongoose";
import { IGroupChat, IGroupMessage } from "../types/chat.types";

// Schema for messages in group chat
const GroupMessageSchema = new Schema<IGroupMessage>(
  {
    senderId: { type: String, required: true },
    text: { type: String, required: true },
    isEdited: { type: Boolean, default: false },
    readBy: { type: [String], default: [] }, // userIds who have read the message
  },
  { timestamps: true }
);

// Schema for group chat
const GroupChatSchema = new Schema<IGroupChat>(
  {
    groupName: { type: String, required: true },
    avatar: { type: String, default: "" },
    adminId: { type: String, required: true },
    members: { type: [String], required: true }, // user IDs of members
    messages: [GroupMessageSchema],
  },
  { timestamps: true }
);

// Model
export const GroupChat = mongoose.model<IGroupChat>("GroupChat", GroupChatSchema);
