import { atom } from "recoil";

// 알림이 있다면 배열에 알림들을 담는다
export const noticeState = atom({
  key: "noticeState",
  default: [],
});

// 알림 아이콘의 색이 white 일지 black 일지
export const isWhiteIcon = atom({
  key: "isWhiteIcon",
  default: true,
});

// 알림 아이콘을 클릭했는지
export const isClickIcon = atom({
  key: "isClickIcon",
  default: false,
});

// 결제 관련 알림이 있는지 없는지
export const priceNoticeAtom = atom({
  key: "priceNoticeAtom",
  default: false,
});

// 주문 관련 알림이 있는지 없는지
export const orderNoticeAtom = atom({
  key: "orderNoticeAtom",
  default: false,
});
