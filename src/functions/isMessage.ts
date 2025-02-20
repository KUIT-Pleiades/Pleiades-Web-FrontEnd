import { Message, User } from "../interfaces/Interfaces";

export function isMessage(data: User | Message): data is Message {
  return "message" in data;
}
