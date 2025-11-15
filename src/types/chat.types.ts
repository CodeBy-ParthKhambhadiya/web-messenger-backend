import { Document } from "mongoose";

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

export interface IGroupMessage {
  _id?: string;
  senderId: string;          // user who sent the message
  text: string;              // message text
  isEdited: boolean;         // if message was edited
  readBy: string[];          // userIds who have read the message
  createdAt?: Date;          // optional timestamps
  updatedAt?: Date;
}

// Group chat interface
export interface IGroupChat extends Document {
  groupName: string;         // name of the group
  avatar?: string;           // group avatar URL
  adminId: string;           // userId of admin
  members: string[];         // array of userIds
  messages: IGroupMessage[]; // array of messages
  createdAt?: Date;
  updatedAt?: Date;
}