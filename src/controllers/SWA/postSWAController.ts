import { NextFunction, Request, Response } from "express";
import { postBBSAction } from "../../actions/BBS/postBBSAction";
import { postSWAAction } from "../../actions/SWA/postSWAAction";

export const postSWAController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const constol = req.body;
    const userId = parseInt(req.params.id);
    const result = await postSWAAction(constol, userId);
    return res.status(result.status).send(result);
  } catch (error) {
    next(error);
  }
};
