import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const postImplementorRepo = async (body: any) => {
  try {
    const { name, team, company, badge, position } = body;
    const implementor = await prisma.implementor.create({
      data: {
        name,
        team,
        company,
        badge,
        position,
      },
    });
    return implementor;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
