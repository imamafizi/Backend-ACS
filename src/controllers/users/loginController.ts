import { NextFunction, Request, Response } from "express";
import { loginAction } from "../../actions/users/loginAction";

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { usernameOrEmail, password } = req.body;
    const login = await loginAction(usernameOrEmail, password);
    res.status(login.status).send(login);
  } catch (error) {
    next(error);
  }
};
