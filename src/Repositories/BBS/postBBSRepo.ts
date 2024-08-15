import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const postBBSRepo = async (body: any, userId: number) => {
  try {
    const {
      date,
      location,
      rig,
      where,
      when,
      find,
      reason,
      suggest,
      p1 = true,
      p2 = true,
      p3 = true,
      p4 = true,
    } = body;

    // Convert potential integer values to Boolean for p1-p4
    const p1Bool = Boolean(p1);
    const p2Bool = Boolean(p2);
    const p3Bool = Boolean(p3);
    const p4Bool = Boolean(p4);

    // Define the qFields object with an index signature
    const qFields: { [key: string]: boolean } = {};

    // Adjusted Loop to Only Include Valid Fields
    const validQFields = [
      "q11",
      "q12",
      "q13",
      "q14",
      "q15",
      "q21",
      "q22",
      "q23",
      "q24",
      "q31",
      "q32",
      "q41",
      "q42",
      "q43",
      "q44",
      "q45",
      "q47",
      "q51",
      "q52",
      "q53",
      "q61",
      "q62",
      "q63",
      "q64",
      "q65",
      "q66",
      "q67",
      "q68",
      "q71",
      "q72",
      "q73",
      "q81",
      "q82",
      "q83",
      "q84",
      "q85",
      "q86",
      "q87",
      "q88",
      "q91",
      "q92",
      "q93",
      "q94",
      "q95",
      "q96",
      "q97",
      "q98",
    ];

    validQFields.forEach((key) => {
      qFields[key] = body[key] !== undefined ? Boolean(body[key]) : true;
    });

    const bbs = await prisma.bBS.create({
      data: {
        date,
        location,
        rig,
        where,
        when,
        find,
        reason,
        suggest,
        p1: p1Bool,
        p2: p2Bool,
        p3: p3Bool,
        p4: p4Bool,
        userId,
        ...qFields, // Spread the dynamically created `q` fields into the data object
      },
    });

    return bbs;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
