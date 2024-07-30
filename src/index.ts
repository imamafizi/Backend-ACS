import express, { NextFunction, Request, Response } from "express";
import userRouters from "./routers/usersRouters";
import bbsRouters from "./routers/bbsRouter";
import swaRouters from "./routers/swaRouter";
import cors from "cors";

const PORT = 4000;
const app = express();

app.use(express.json());
app.use(cors());

app.use("/users", userRouters);
app.use("/bbs", bbsRouters);
app.use("/swa", swaRouters);

app.listen(PORT, () => {
  console.log(`server running port: ${PORT}`);
});
