import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getBBSByIdRepo = async (id: number) => {
  try {
    const bbs = await prisma.bBS.findUnique({
      where: { id },
    });
    return bbs;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
