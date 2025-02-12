import { atom } from "recoil";

export const loginAtom = atom({
  key: "loginAtom",
  default: false,
});

// 로그인한 유저의 정보
export const userDataAtom = atom({
  key: "userDataAtom",
  default: {
    companyId: 0,
    companyName: "",
    email: "",
    name: "",
    phone: "",
    pic: null,
    point: 0,
    roleId: "",
    uid: "",
    userId: 0,
  },
});

// 위치 정보
export const locationAtom = atom({
  key: "locationAtom",
  default: {
    latitude: 35.8682922103488,
    longitude: 128.594024377585,
  },
});

export const ticketIdAtom = atom({
  key: "ticketIdAtom",
  default: null,
});

export const ticketDataAtom = atom({
  key: "ticketDataAtom",
  default: {
    restaurantName: "",
    menuCount: 0,
    totalAmount: 0,
    personCount: 0,
    reservationTime: null,
    menuNames: "",
  },
});
