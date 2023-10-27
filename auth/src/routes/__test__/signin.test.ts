import request from "supertest";
import { app } from "../../app";

it("fails with a email that does not exist is supplied", async () => {
  await request(app)
    .post("/app/users/signin")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(400);
});

it("fails when an incorrect password is supplied", async () => {
  await request(app)
    .post("/app/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);

  await request(app)
    .post("/app/users/signin")
    .send({
      email: "test@test.com",
      password: "pnerjigebninmr",
    })
    .expect(400);
});

it("it sets a cookie when a user signins in ", async () => {
  await request(app)
    .post("/app/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);

  const response = await request(app)
    .post("/app/users/signin")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(200);

  expect(response.get("Set-Cookie")).toBeDefined();
});
