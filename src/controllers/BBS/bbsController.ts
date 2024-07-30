import { log } from "console";
import { NextFunction, Request, Response } from "express";
import { allBBSAction } from "../../actions/BBS/allBBSAction";

export const bbsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cek = await allBBSAction();
    res.status(cek.status).send(cek);
  } catch (error) {
    next(error);
  }
};
