import mongoose, { Schema, Document, Types } from "mongoose";

// Interface for a single message
export interface IMessage {
    _id?: string;
    senderId: string;         // User ID of the sender
    text: string;             // Message text
    isRead: boolean;          // Read status
    createdAt?: Date;         // Timestamp
    updatedAt?: Date;         // Timestamp
}

// Interface for a chat room
export interface IChatRoom extends Document {
    participants: string[];   // Array of user IDs
    messages: IMessage[];     // Messages in the room
    createdAt?: Date;         // Timestamp
    updatedAt?: Date;         // Timestamp
}

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
