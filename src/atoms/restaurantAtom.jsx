import { atom } from "recoil";

export const isLoginStoreAtom = atom({
  key: "isLoginStoreAtom",
  default: false,
});

export const reloadOrderAtom = atom({
  key: "reloadOrderAtom",
  default: false,
});

// true 이면 예약상태, false이면 앉아서 주문
export const reserveState = atom({
  key: "reserveState",
  default: false,
});

// "예약" 할 경우 주문정보
export const reserveDataAtom = atom({
  key: "reserveDataAtom",
  default: {
    restaurantId: 0,
    reservationTime: "",
    reservationPeopleCount: 0,
    menuList: [
      {
        menuId: 0,
        menuCount: 0,
      },
    ],
  },
});

// "앉아서 주문" 할 경우 주문정보
export const orderDataAtom = atom({
  key: "orderDataAtom",
  default: {
    restaurantId: 0,
    reservationYn: 0,
    orderDetails: [
      {
        menuId: 0,
        menuCount: 0,
      },
    ],
  },
});

// 주문 정보 Id
export const orderIdAtom = atom({
  key: "orderIdAtom",
  default: 0,
});

export const memberDataAtom = atom({
  key: "memberDataAtom",
  default: {
    orderId: 0,
    userId: [],
    point: [],
  },
});

// 함께 예약할 인원 임시 저장
export const paymentMemberAtom = atom({
  key: "paymentMemberAtom",
  default: [
    {
      name: null,
      uid: null,
      userId: null,
    },
  ],
});
