import { NextFunction, Request, Response } from "express";
import { getSWAByIdAction } from "../../actions/SWA/getSWAByIdAction";

export const getSWAByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.id);
    const result = await getSWAByIdAction(id);
    return res.status(result.status).send(result);
  } catch (error) {
    next(error);
  }
};
