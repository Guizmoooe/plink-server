import { FilterQuery } from "mongoose";
import { omit } from "lodash";
import UserModel, { UserDocument, UserInput } from "../model/user.model";

export async function getUsers() {
  try {
    const users = await UserModel.find();
    return users;
  } catch (error: any) {
    throw new Error("Error while fetching users");
  }
}

export async function getUser(id: string) {
  try {
    const user = await UserModel.findById(id);
    return user;
  } catch (error: any) {
    throw new Error("Error while fetching users");
  }
}
export async function createUser(input: UserInput) {
  try {
    const user = await UserModel.create(input);

    return omit(user.toJSON(), "password");
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function validatePassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const user = await UserModel.findOne({ email });

  if (!user) {
    return false;
  }

  const isValid = await user.comparePassword(password);

  if (!isValid) return false;

  return omit(user.toJSON(), "password");
}
