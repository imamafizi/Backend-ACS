import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllusers = async () => {
  try {
    const getUsers = await prisma.user.findMany();
    return getUsers;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
