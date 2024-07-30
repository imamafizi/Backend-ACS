import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUsernameRepo = async (username: string) => {
  try {
    const userName = await prisma.user.findMany({
      where: {
        username: username,
      },
    });

    return userName;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
