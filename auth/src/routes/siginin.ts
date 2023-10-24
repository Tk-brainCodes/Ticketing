import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "./../errors/request-validation-errors";
const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Enter a valid email"),
    body("password").trim().notEmpty().withMessage("Password is required"),
  ],
  (req: Request, res: Response) => {
    const { email, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }
  }
);

export { router as signInRouter };
