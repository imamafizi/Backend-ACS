import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const perpetratorRepo = async (body: any) => {
  try {
    const { name, team, company, badge, position } = body;
    const perpetrator = await prisma.perpetrator.create({
      data: {
        name,
        team,
        company,
        badge,
        position,
      },
    });
    return perpetrator;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
