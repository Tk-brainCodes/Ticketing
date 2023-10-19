import express from "express";
import 'express-async-errors'
import { json } from "body-parser";
import { currentUserRouter } from "./routes/current-user";
import { signInRouter } from "./routes/siginin";
import { siginOutRouter } from "./routes/signout";
import { signUpRouter } from "./routes/signup";
import { errorHandler } from "./routes/middlewares/errors-handler";
import { NotFoundError } from "./errors/not-found-errors";

const app = express();
app.use(json());

app.use(currentUserRouter);
app.use(signInRouter);
app.use(siginOutRouter);
app.use(signUpRouter);

app.all("*", async (req, res, next) => {
  throw new NotFoundError();
});

app.use(errorHandler);

app.listen(3000, () => {
  console.log("Listening on port 3000!");
});
