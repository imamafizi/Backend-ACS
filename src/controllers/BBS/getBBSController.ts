import { NextFunction, Request, Response } from "express";
import { getBBSService } from "../../services/bbs/getBBSService";

export const getBBSController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await getBBSService(req);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};
