import { Request, Response } from "express";
import { CreateUserInput } from "../schema/user.schema";
import { createUser, getUsers, getUser } from "../service/user.service";
import logger from "../utils/logger";

export async function getUsersHandler(req: Request, res: Response) {
  try {
    if (req.params.id) {
      const user = await getUser(req.params.id);
      res.status(200).json(user);
    } else {
      const users = await getUsers();
      return res.send(users);
    }
  } catch (error) {
    logger.error(error);
  }
}

export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput["body"]>,
  res: Response
) {
  try {
    const user = await createUser(req.body);
    return res.send(user);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
}

export async function updateUserHandler(req: Request<{}, {}>, res: Response) {
return;
}
