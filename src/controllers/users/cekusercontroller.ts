import { NextFunction, Request, Response } from "express";
import { cekusers } from "../../actions/users/cekusers";

export const cekUsersController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cek = await cekusers();
    res.status(cek.status).send(cek);
  } catch (error) {
    next(error);
  }
};
