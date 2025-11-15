import { Document } from "mongoose";

// Interface for a single message
export interface IMessage {
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
}
