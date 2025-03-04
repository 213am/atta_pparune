import { atom } from "recoil";

interface MenuSelect {
  about: boolean;
  enroll: boolean;
  notice: boolean;
}

export const menuState = atom<MenuSelect>({
  key: "menuState",
  default: { about: true, enroll: true, notice: true },
});
