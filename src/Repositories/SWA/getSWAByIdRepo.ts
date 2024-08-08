import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getSWAByIdRepo = async (id: number) => {
  try {
    const swa = await prisma.sWA.findUnique({
      where: { id },
    });
    return swa;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
