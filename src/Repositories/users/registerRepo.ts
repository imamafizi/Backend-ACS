import { PrismaClient } from "@prisma/client";
import { IUser } from "../../type/type";

const prisma = new PrismaClient();

export const registerRepo = async (body: IUser) => {
  try {
    const { username, email, password } = body;
    const register = await prisma.user.create({
      data: {
        username,
        email,
        password,
      },
    });
    return register;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
