import { Prisma } from "@prisma/client";
import { isValid, parseISO } from "date-fns";
import { Request } from "express";
import { prisma } from "../../helper/prisma";

export const getBBSService = async (req: Request) => {
  try {
    const { page, take, sortBy, sortOrder, startDate, endDate, search } =
      req.query;

    let whereClause: Prisma.BBSWhereInput = {};

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

    if (search) {
      whereClause.rig = { contains: String(search) };
    }

    const bbs = await prisma.bBS.findMany({
      where: whereClause,
      skip:
        ((parseInt(page as string) || 1) - 1) *
        (parseInt(take as string) || 10),
      take: parseInt(take as string) || 10,
      orderBy: {
        [sortBy?.toString() || "createdAt"]: sortOrder?.toString() || "desc",
      },
      include: {
        user: {
          select: { username: true },
        },
      },
    });

    const count = await prisma.bBS.count({ where: whereClause });

    return {
      data: bbs,
      meta: {
        page: parseInt(page as string) || 1,
        take: parseInt(take as string) || 10,
        total: count,
      },
    };
  } catch (error) {
    throw error;
  }
};
