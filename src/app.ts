import Fastify from "fastify";
import cors from "@fastify/cors";
import { connectDB } from "./config/db";
import apiIndex from "./routes/index";

export const buildApp = async () => {
  const fastify = Fastify();

  // Register CORS with options
  await fastify.register(cors, {
    origin: ["http://localhost:3000"], // allow your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // if you need cookies/auth headers
  });

  await connectDB();

  fastify.register(apiIndex, { prefix: "/api" });

  return { fastify };
};
