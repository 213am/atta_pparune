import { atom } from "recoil";

interface AdminMenu {
  first: boolean;
  second: boolean;
  third: boolean;
  forth: boolean;
  fifth: boolean;
}

export const adminMenuState = atom<AdminMenu>({
  key: "adminMenuState",
  default: {
    first: true,
    second: false,
    third: false,
    forth: false,
    fifth: false,
  },
});

export const adminSubMenuState = atom<number>({
  key: "adminSubMenuState",
  default: 0,
});

export const storeMenuState = atom<string>({
  key: "storeMenuState",
  default: "",
});
