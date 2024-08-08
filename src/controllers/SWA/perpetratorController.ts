import { NextFunction, Request, Response } from "express";
import { perpetratorAction } from "../../actions/SWA/perpetratorAction";

export const perpetratorController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const perpetrator = req.body;
    const result = await perpetratorAction(perpetrator);
    res.status(result.status).send(result);
  } catch (error) {
    next(error);
  }
};
