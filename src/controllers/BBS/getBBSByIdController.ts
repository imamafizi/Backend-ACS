import { NextFunction, Request, Response } from "express";
import { getBBSByIdAction } from "../../actions/BBS/getBBSByIdAction";

export const getBBSByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.id);
    const result = await getBBSByIdAction(id);
    return res.status(result.status).send(result);
  } catch (error) {
    next(error);
  }
};
