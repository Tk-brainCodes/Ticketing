import express from "express";
import { json } from "body-parser";
import { currentUserRouter } from "./routes/current-user";
import { signInRouter } from "./routes/siginin";
import { siginOutRouter } from "./routes/signout";
import { signUpRouter } from "./routes/signup";

const app = express();
app.use(json());

app.use(currentUserRouter);
app.use(signInRouter);
app.use(siginOutRouter);
app.use(signUpRouter);

app.listen(3000, () => {
  console.log("Listening on port 3000!");
});
