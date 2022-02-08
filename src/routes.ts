import { Express, Request, Response } from "express";
import {
  createUserSessionHandler,
  getUserSessionHandler,
} from "./controller/session.controller";
import {
  createUserHandler,
  getUsersHandler,
} from "./controller/user.controller";
import validate from "./middleware/validateResouce";
import { createUserSchema } from "./schema/user.schema";
import { createSessionSchema } from "./schema/session.schema";

export default function routes(app: Express) {
  // USERS
  /**
   * @Route GET /api/users
   * @Description Get all users
   * @Access Public
   */
  app.get("/api/users", (req: Request, res: Response) => {
    getUsersHandler(req, res);
  });

  /**
   * @Route GET /api/users/{id}
   * @Description Get user by id
   * @Access Public
   * @Param {string} id
   * @Response {200} User
   * @Response {404} User not found
   * @Response {500} Internal server error
   */
  app.get("/api/users/:id", (req: Request, res: Response) => {
    getUsersHandler(req, res);
  });

  /**
   * @Route POST /api/users
   * @Description Create a new user
   * @Access Public
   * @BodyParam name string required
   * @BodyParam email string required
   * @BodyParam password string required
   * @BodyParam passwordConfirmation string required
   */
  app.post("/api/users", validate(createUserSchema), createUserHandler);

  // SESSIONS
  app.get("/api/sessions", getUserSessionHandler);
  app.post(
    "/api/sessions",
    validate(createSessionSchema),
    createUserSessionHandler
  );
}
