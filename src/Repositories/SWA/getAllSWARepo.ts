import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllSWARepo = async () => {
  try {
    const swa = await prisma.sWA.findMany({
      include: {
        user: true,
        feedback: true,
        implementor: true,
        perpetrator: true,
      },
    });
    return swa;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
