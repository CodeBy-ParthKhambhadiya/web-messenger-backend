import Fastify from "fastify";
import cors from "@fastify/cors";
import { connectDB } from "./config/db";
import apiIndex from "./routes/index";

export const buildApp = async () => {
  const fastify = Fastify();

  await fastify.register(cors);
  await connectDB();

  fastify.register(apiIndex, { prefix: "/api" });

  return { fastify };
};
