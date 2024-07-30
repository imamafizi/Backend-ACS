import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getPasswordRepo = async (password: string) => {
  try {
    const passWord = await prisma.user.findMany({
      where: {
        password: password,
      },
    });
    return passWord;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
