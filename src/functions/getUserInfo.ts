import { Character } from "../interfaces/Interfaces";
import { fetchRequest } from "./fetchRequest";

export async function getCharacter() {
  const userData = fetchRequest<Character>("/home/me", "GET", null);
  return userData;
}
