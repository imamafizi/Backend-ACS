import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const postSWARepo = async (body: any, userId: number) => {
  try {
    const {
      date,
      location,
      reason,
      response,
      desc,
      q1,
      q2,
      q3,
      q4,
      q5,
      implementorId,
      perpetratorId,
    } = body;
    const swa = await prisma.sWA.create({
      data: {
        date,
        location,
        reason,
        response,
        desc,
        q1,
        q2,
        q3,
        q4,
        q5,
        userId,
        implementorId,
        perpetratorId,
      },
    });
    return swa;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
