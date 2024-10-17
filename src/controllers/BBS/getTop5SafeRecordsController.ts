import { isValid, parseISO } from "date-fns";
import { NextFunction, Request, Response } from "express";
import { prisma } from "../../helper/prisma";

export const getTop5SafeCategoriesController = async (
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

    const counts = {
      bodyPosition: 0,
      bodyUsage: 0,
      tools: 0,
      procedure: 0,
      workArea: 0,
      officeErgonomics: 0,
      maintenance: 0,
      protectiveEquipment: 0,
      driving: 0,
    };

    data.forEach((record) => {
      counts.bodyPosition += [
        record.q11,
        record.q12,
        record.q13,
        record.q14,
        record.q15,
      ].filter((value) => value === false).length;

      counts.bodyUsage += [
        record.q21,
        record.q22,
        record.q23,
        record.q24,
      ].filter((value) => value === false).length;

      counts.tools += [record.q31, record.q32].filter(
        (value) => value === false
      ).length;

      counts.procedure += [
        record.q41,
        record.q42,
        record.q43,
        record.q44,
        record.q45,
        record.q47,
      ].filter((value) => value === false).length;

      counts.workArea += [record.q51, record.q52, record.q53].filter(
        (value) => value === false
      ).length;

      counts.officeErgonomics += [
        record.q61,
        record.q62,
        record.q63,
        record.q64,
        record.q65,
        record.q66,
        record.q67,
        record.q68,
      ].filter((value) => value === false).length;

      counts.maintenance += [record.q71, record.q72, record.q73].filter(
        (value) => value === false
      ).length;

      counts.protectiveEquipment += [
        record.q81,
        record.q82,
        record.q83,
        record.q84,
        record.q85,
        record.q86,
        record.q87,
        record.q88,
      ].filter((value) => value === false).length;

      counts.driving += [
        record.q91,
        record.q92,
        record.q93,
        record.q94,
        record.q95,
        record.q96,
        record.q97,
        record.q98,
      ].filter((value) => value === false).length;
    });

    const categoryLabels: any = {
      bodyPosition: "Body Position",
      bodyUsage: "Body Usage",
      tools: "Tools",
      procedure: "Procedure",
      workArea: "Work Area",
      officeErgonomics: "Office Ergonomics",
      maintenance: "Maintenance",
      protectiveEquipment: "Protective Equipment",
      driving: "Driving",
    };

    const categories = Object.entries(counts).map(([category, count]) => ({
      category,
      count,
      label: categoryLabels[category],
    }));

    const topSafeCategories = categories
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    res.status(200).send({ topSafeCategories });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
