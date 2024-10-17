import { NextFunction, Request, Response } from "express";
import { prisma } from "../../helper/prisma";
import { isValid, parseISO } from "date-fns";

export const getBBSAtRiskCategoriesController = async (
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

    const counts = {
      bodyPosition: {
        totalAtRisk: 0,
        totalQuestion: 5,
      },
      bodyUsage: {
        totalAtRisk: 0,
        totalQuestion: 4,
      },
      tools: {
        totalAtRisk: 0,
        totalQuestion: 2,
      },
      procedure: {
        totalAtRisk: 0,
        totalQuestion: 6,
      },
      workArea: {
        totalAtRisk: 0,
        totalQuestion: 3,
      },
      officeErgonomics: {
        totalAtRisk: 0,
        totalQuestion: 8,
      },
      maintenance: {
        totalAtRisk: 0,
        totalQuestion: 3,
      },
      protectiveEquipment: {
        totalAtRisk: 0,
        totalQuestion: 8,
      },
      driving: {
        totalAtRisk: 0,
        totalQuestion: 8,
      },
    };

    data.forEach((record) => {
      counts.bodyPosition.totalAtRisk += [
        record.q11,
        record.q12,
        record.q13,
        record.q14,
        record.q15,
      ].filter(Boolean).length;
      counts.bodyUsage.totalAtRisk += [
        record.q21,
        record.q22,
        record.q23,
        record.q24,
      ].filter(Boolean).length;
      counts.tools.totalAtRisk += [record.q31, record.q32].filter(
        Boolean
      ).length;
      counts.procedure.totalAtRisk += [
        record.q41,
        record.q42,
        record.q43,
        record.q44,
        record.q45,
        record.q47,
      ].filter(Boolean).length;
      counts.workArea.totalAtRisk += [
        record.q51,
        record.q52,
        record.q53,
      ].filter(Boolean).length;
      counts.officeErgonomics.totalAtRisk += [
        record.q61,
        record.q62,
        record.q63,
        record.q64,
        record.q65,
        record.q66,
        record.q67,
        record.q68,
      ].filter(Boolean).length;
      counts.maintenance.totalAtRisk += [
        record.q71,
        record.q72,
        record.q73,
      ].filter(Boolean).length;
      counts.protectiveEquipment.totalAtRisk += [
        record.q81,
        record.q82,
        record.q83,
        record.q84,
        record.q85,
        record.q86,
        record.q87,
        record.q88,
      ].filter(Boolean).length;
      counts.driving.totalAtRisk += [
        record.q91,
        record.q92,
        record.q93,
        record.q94,
        record.q95,
        record.q96,
        record.q97,
        record.q98,
      ].filter(Boolean).length;
    });

    res.send({ totalRecords, data: counts });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
