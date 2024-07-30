import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUsersRepo = async (username: string, email: string) => {
  try {
    const users = await prisma.user.findMany({
      where: {
        OR: [
          {
            username: {
              equals: username,
            },
          },
          {
            email: {
              equals: email,
            },
          },
        ],
      },
    });
    return users;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
