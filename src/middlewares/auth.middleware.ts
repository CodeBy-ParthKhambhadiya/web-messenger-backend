import { FastifyReply, FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";
import { ENV } from "../config/env";

export interface IUserPayload {
  id: string;
  email: string;
}

export const authenticate = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return reply.status(401).send({ success: false, message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return reply.status(401).send({ success: false, message: "Invalid token" });
    }

    const payload = jwt.verify(token, ENV.JWT_SECRET) as IUserPayload;
    req.user = payload; // attach user payload to request
  } catch (err) {
    return reply.status(401).send({ success: false, message: "Unauthorized" });
  }
};
