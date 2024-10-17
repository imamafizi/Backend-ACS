import { Prisma } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { prisma } from "../../helper/prisma";

export const getSWAController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { page, take, sortBy, sortOrder, search } = req.query;

    const whereClause: Prisma.SWAWhereInput = {};

    if (search) {
      // NOTE: adjust based on req
      whereClause.OR = [
        { location: { contains: search as string } },
        { nameImplementor: { contains: search as string } },
      ];
    }

    const swa = await prisma.sWA.findMany({
      where: whereClause,
      skip:
        ((parseInt(page as string) || 1) - 1) *
        (parseInt(take as string) || 10),
      take: parseInt(take as string) || 10,
      orderBy: {
        [sortBy?.toString() || "createdAt"]: sortOrder?.toString() || "desc",
      },
      include: {
        user: true,
      },
    });

    const count = await prisma.sWA.count({ where: whereClause });

    res.status(200).send({
      data: swa,
      meta: {
        page: parseInt(page as string) || 1,
        take: parseInt(take as string) || 10,
        total: count,
      },
    });
  } catch (error) {
    next(error);
  }
};
