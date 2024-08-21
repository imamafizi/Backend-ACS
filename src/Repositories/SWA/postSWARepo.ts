import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const postSWARepo = async (body: any, userId: number) => {
  try {
    const {
      nameImplementor,
      teamImplementor,
      companyImplementor,
      badgeImplementor,
      positionImplementor,
      namePerpetrator,
      teamPerpetrator,
      companyPerpetrator,
      badgePerpetrator,
      positionPerpetrator,
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
    } = body;

    const booleanQ1 = Boolean(q1);
    const booleanQ2 = Boolean(q2);
    const booleanQ3 = Boolean(q3);
    const booleanQ4 = Boolean(q4);
    const booleanQ5 = Boolean(q5);

    const swa = await prisma.sWA.create({
      data: {
        nameImplementor,
        teamImplementor,
        companyImplementor,
        badgeImplementor,
        positionImplementor,
        namePerpetrator,
        teamPerpetrator,
        companyPerpetrator,
        badgePerpetrator,
        positionPerpetrator,
        date,
        location,
        reason,
        response,
        desc,
        q1: booleanQ1,
        q2: booleanQ2,
        q3: booleanQ3,
        q4: booleanQ4,
        q5: booleanQ5,
        userId,
      },
    });
    return swa;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
