import { NextFunction, Request, Response } from "express";
import { postImplementorAction } from "../../actions/SWA/postImplementorAction";

export const postImplementorController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const implementor = req.body;
    const result = await postImplementorAction(implementor);
    res.status(result.status).send(result);
  } catch (error) {
    next(error);
  }
};
