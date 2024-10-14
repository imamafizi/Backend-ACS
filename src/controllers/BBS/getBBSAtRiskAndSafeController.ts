import { NextFunction, Request, Response } from "express";
import { prisma } from "../../helper/prisma";
import { isValid, parseISO } from "date-fns";

export const getBBSAtRiskAndSafeController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { startDate, endDate } = req.query;

    let whereClause = {};

    if (startDate || endDate) {
      const parsedStartDate =
        startDate && isValid(parseISO(startDate as string))
          ? parseISO(startDate as string)
          : undefined;
      const parsedEndDate =
        endDate && isValid(parseISO(endDate as string))
          ? parseISO(endDate as string)
          : undefined;

      whereClause = {
        date: {
          ...(parsedStartDate ? { gte: parsedStartDate } : {}),
          ...(parsedEndDate ? { lte: parsedEndDate } : {}),
        },
      };
    }

    const data = await prisma.bBS.findMany({
      where: whereClause,
    });

    const totalRecords = await prisma.bBS.count({
      where: whereClause,
    });

    let totalQuestions = 0;
    let totalAtRisk = 0;
    let totalSafe = 0;

    data.forEach((record) => {
      const riskFields = [
        record.q11,
        record.q12,
        record.q13,
        record.q14,
        record.q15,
        record.q21,
        record.q22,
        record.q23,
        record.q24,
        record.q31,
        record.q32,
        record.q41,
        record.q42,
        record.q43,
        record.q44,
        record.q45,
        record.q47,
        record.q51,
        record.q52,
        record.q53,
        record.q61,
        record.q62,
        record.q63,
        record.q64,
        record.q65,
        record.q66,
        record.q67,
        record.q68,
        record.q71,
        record.q72,
        record.q73,
        record.q81,
        record.q82,
        record.q83,
        record.q84,
        record.q85,
        record.q86,
        record.q87,
        record.q88,
        record.q91,
        record.q92,
        record.q93,
        record.q94,
        record.q95,
        record.q96,
        record.q97,
        record.q98,
      ];

      totalQuestions += riskFields.length;
      totalAtRisk += riskFields.filter((field) => field === true).length;
      totalSafe += riskFields.filter((field) => field === false).length;
    });

    const safePercentage = (totalSafe / totalQuestions) * 100;
    const atRiskPercentage = (totalAtRisk / totalQuestions) * 100;

    res.status(200).send({
      totalRecords,
      totalQuestions,
      totalSafe,
      totalAtRisk,
      percentages: {
        safe: safePercentage,
        atRisk: atRiskPercentage,
      },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
