import { FastifyRequest, FastifyReply } from "fastify";

import {
  registerService,
  loginService,
  forgotPasswordService,
} from "../services/auth.service";

import {
  IRegisterBody,
  ILoginBody,
  IForgotPasswordBody,
} from "../types/auth.types";

// -----------------------------------------------------
// Register Controller
// -----------------------------------------------------
export const registerController = async (
  req: FastifyRequest<{ Body: IRegisterBody }>,
  reply: FastifyReply
) => {
  try {
    const user = await registerService(req.body);

    reply.send({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  } catch (error: any) {
    reply.status(400).send({
      success: false,
      message: error.message,
    });
  }
};


// -----------------------------------------------------
// Login Controller
// -----------------------------------------------------
export const loginController = async (
  req: FastifyRequest<{ Body: ILoginBody }>,
  reply: FastifyReply
) => {
  try {
    const { user, token } = await loginService(req.body);

    reply.send({
      success: true,
      message: "Login successful",
      token,
      data: user,
    });
  } catch (error: any) {
    reply.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

// -----------------------------------------------------
// Forgot Password Controller
// -----------------------------------------------------
export const forgotPasswordController = async (
  req: FastifyRequest<{ Body: IForgotPasswordBody }>,
  reply: FastifyReply
) => {
  try {
    const message = await forgotPasswordService(req.body);

    reply.send({
      success: true,
      message,
    });
  } catch (error: any) {
    reply.status(400).send({
      success: false,
      message: error.message,
    });
  }
};
