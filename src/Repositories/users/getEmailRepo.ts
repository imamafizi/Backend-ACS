import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getEmailRepo = async (email: string) => {
  try {
    const getEmail = await prisma.user.findMany({
      where: {
        email: email,
      },
    });
    return getEmail;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
