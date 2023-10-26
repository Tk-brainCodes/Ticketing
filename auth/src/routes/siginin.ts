import express, { Request, Response } from "express";
import { body } from "express-validator";
import { validateRequest } from "./middlewares/valid-request";
import { User } from "../models/user";
import { BadRequest } from "../errors/bad-request-error";
import { Password } from "../services/password";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Enter a valid email"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("You must supply a password"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = User.findOne({ email });

    //check if user exists in mongo db
    if (!existingUser) {
      throw new BadRequest("Invalid credentials");
    }

    //hash the password and check against the password stored in mongo db
    const passwordMatch = await Password.compare(
      //@ts-ignore
      existingUser.password,
      password
    );

    if (!passwordMatch) {
      throw new BadRequest("Invalid Credentials");
    }

    //Generate JWT
    const userJwt = jwt.sign(
      {
        //@ts-ignore
        id: existingUser.id,
        //@ts-ignore
        email: existingUser.email,
      },
      process.env.JWT_KEY!
    );

    //store jwt on session object
    req.session = {
      jwt: userJwt,
    };

    res.status(200).send(existingUser);
  }
);

export { router as signInRouter };
