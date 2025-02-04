import { User } from "../interfaces/Interfaces";
import { fetchRequest } from "./fetchRequest";

export async function getUser() {
  const userData = await fetchRequest<User>("/home", "GET", null);
  return userData;
}
