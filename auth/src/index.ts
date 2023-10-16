import express from "express";
import { json } from "body-parser";

const app = express();
app.use(json());

app.get('api.get/currentUser', (req, res) => {
  res.send("hi there!")
})

app.listen(3000, () => {
  console.log("Listening on port 3000!");
});
