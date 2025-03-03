import { atom } from "recoil";
import { USER } from "../constants/Role";

export const roleAtom = atom({
  key: "roleAtom",
  default: USER,
});
