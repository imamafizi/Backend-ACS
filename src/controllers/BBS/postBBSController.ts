import { NextFunction, Request, Response } from "express";
import { postBBSAction } from "../../actions/BBS/postBBSAction";

export const postBBSController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const constol = req.body;
    const userid = parseInt(req.params.id);
    const result = await postBBSAction(constol, userid);
    return res.status(result.status).send(result);
  } catch (error) {
    next(error);
  }
};
