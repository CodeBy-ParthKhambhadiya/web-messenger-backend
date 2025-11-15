import { GroupChat } from "../models/group.chat.modle";
import { IGroupChat, IGroupMessage } from "../types/chat.types";

// Create group chat
export const createGroupChat = async (
  adminId: string,
  groupName: string,
  members: string[],
  avatar?: string
): Promise<IGroupChat> => {
  const group = await GroupChat.create({ adminId, groupName, members, avatar, messages: [] });
  return group;
};

// Add member
export const addGroupMember = async (groupId: string, memberId: string): Promise<IGroupChat> => {
  const group = await GroupChat.findByIdAndUpdate(
    groupId,
    { $addToSet: { members: memberId } },
    { new: true }
  );
  if (!group) throw new Error("Group not found");
  return group;
};

// Remove member
export const removeGroupMember = async (groupId: string, memberId: string): Promise<IGroupChat> => {
  const group = await GroupChat.findByIdAndUpdate(
    groupId,
    { $pull: { members: memberId } },
    { new: true }
  );
  if (!group) throw new Error("Group not found");
  return group;
};

// Add message
export const addGroupMessage = async (
  groupId: string,
  senderId: string,
  text: string
): Promise<IGroupChat> => {
  const message: IGroupMessage = { senderId, text, isEdited: false, readBy: [] };
  const group = await GroupChat.findByIdAndUpdate(
    groupId,
    { $push: { messages: message } },
    { new: true }
  );
  if (!group) throw new Error("Group not found");
  return group;
};

// Edit message
export const editGroupMessage = async (
  groupId: string,
  messageId: string,
  newText: string
): Promise<IGroupChat> => {
  const group = await GroupChat.findById(groupId);
  if (!group) throw new Error("Group not found");

  const message = group.messages.find(msg => msg._id?.toString() === messageId);
  if (!message) throw new Error("Message not found");

  message.text = newText;
  message.isEdited = true;
  message.updatedAt = new Date();

  await group.save();
  return group;
};

// Mark message as read
export const markGroupMessageRead = async (
  groupId: string,
  messageId: string,
  userId: string
): Promise<IGroupChat> => {
  const group = await GroupChat.findById(groupId);
  if (!group) throw new Error("Group not found");

  const message = group.messages.find(msg => msg._id?.toString() === messageId);
  if (!message) throw new Error("Message not found");

  if (!message.readBy.includes(userId)) message.readBy.push(userId);
  await group.save();
  return group;
};

// Get group by ID
export const getGroupChat = async (groupId: string): Promise<IGroupChat> => {
  const group = await GroupChat.findById(groupId);
  if (!group) throw new Error("Group not found");
  return group;
};
