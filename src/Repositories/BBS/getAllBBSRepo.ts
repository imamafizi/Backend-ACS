import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllBBSRepo = async () => {
  try {
    const bbs = await prisma.bBS.findMany({
      include: {
        user: true,
      },
    });
    return bbs;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
