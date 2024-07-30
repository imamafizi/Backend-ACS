import { NextFunction, Request, Response } from "express";
import jwt, { TokenExpiredError } from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET_KEY!;

interface PayloadToken {
  id: number;
}

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).send({
      message: "Authorization failed, token is missing",
    });
  }
  jwt.verify(token, secretKey, (err, payload) => {
    if (err) {
      if (err instanceof TokenExpiredError) {
        return res.status(403).send({ message: "Token expired" });
      } else {
        return res.status(403).send({ message: "Invalid token" });
      }
    }

    req.body.user = payload as PayloadToken;

    next();
  });
};
