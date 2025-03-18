import { atom } from "recoil";

export const pointState = atom<string>({
  key: "pointState",
  default: "",
});
