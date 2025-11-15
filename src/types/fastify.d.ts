import { IUserPayload } from "../middlewares/auth.middleware";
import { IChatRoom } from "../models/chat.model";

declare module "fastify" {
  interface FastifyRequest {
    user?: IUserPayload; // attached by auth middleware
    room?: IChatRoom;    // attached by roomAccess middleware
  }
}