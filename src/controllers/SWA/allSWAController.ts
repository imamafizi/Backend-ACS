import { NextFunction, Request, Response } from "express";
import { allSWAAction } from "../../actions/SWA/allSWAAction";

export const allSWAController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const swa = await allSWAAction();
    res.status(swa.status).send(swa);
  } catch (error) {
    next(error);
  }
};
