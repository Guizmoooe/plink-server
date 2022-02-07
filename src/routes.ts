import { Express, Request, Response } from "express";
import { createUserHandler } from "./controller/user.controller";
import validate from "./middleware/validateResouce";
import { createUserSchema } from "./schema/user.schema";
export default function routes(app: Express) {
  app.post("/api/users", validate(createUserSchema), createUserHandler);
}
