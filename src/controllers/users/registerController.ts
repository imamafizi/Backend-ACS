import { NextFunction, Request, Response } from "express";
import { registerAction } from "../../actions/users/registerAction";

export const registerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const register = req.body;
    const result = await registerAction(register);
    return res.status(result.status).send(result);
  } catch (error) {
    next(error);
  }
};
