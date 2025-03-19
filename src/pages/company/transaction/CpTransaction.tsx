/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import AdminHeader from "../../../components/AdminHeader";
import BuyPoint from "./BuyPoint";
import SendPoint from "./SendPoint";
import { PaymentCheckoutPage } from "./toss/PaymentCheckoutPage";
import axios from "axios";
import { getCookie } from "../../../components/cookie";
import Swal from "sweetalert2";
import { useRecoilValue } from "recoil";
import { pointState } from "../../../atoms/companyPointAtom";

const CpTransaction = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState({
    buy: false,
    refund: false,
  });
  const [point, setPoint] = useState("");

  const accessToken = getCookie();
  const adminId = Number(sessionStorage.getItem("adminId") as string);
  const companyPoint = useRecoilValue(pointState);

  // 환불 요청
  const postRefund = async () => {
    const data = { adminId, refundPoint: Number(point), refundDetail: "" };
    try {
      await axios.post("/api/admin/company/v3/refund", data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      Swal.fire("환불 요청이 성공적으로\n처리되었습니다.", "", "success");
      setIsOpen({ buy: false, refund: false });
    } catch (error: any) {
      Swal.fire(
        "환불 요청에 실패하였습니다.",
        `${error.response.data.resultMsg}`,
        "error",
      );
      setIsOpen({ buy: false, refund: false });

      console.log(error);
    }
  };

  return (
    <div className="relative flex flex-col w-full overflow-hidden h-dvh bg-white">
      <AdminHeader title="거래내역" />
      <div className="px-10 py-5 bg-gray w-[100%] h-[100vh]">
        <div className="flex gap-3 absolute right-0 mr-10">
          <button
            onClick={() => {
              if (Number(companyPoint.replace(/,/g, ""))) {
                setIsOpen({ buy: false, refund: true });
              } else {
                Swal.fire("환불 가능한 포인트가 없습니다.", "", "error");
              }
            }}
            className="px-4 py-2 rounded-[5px] bg-lightGreen hover:bg-green text-white"
          >
            포인트환불
          </button>
          <button
            onClick={() => setIsOpen({ buy: true, refund: false })}
            className="px-4 py-2 rounded-[5px] bg-primary hover:bg-primaryFocus text-white"
          >
            포인트구매
          </button>
        </div>
        <div className="mt-5 flex gap-20">
          <BuyPoint />
          <SendPoint />
        </div>
      </div>
      {isOpen.buy && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold flex justify-center mb-10">
              아따빠르네 포인트구매
            </h2>
            <div className="flex gap-5">
              <input
                type="number"
                className="w-[250px] border border-darkGray px-2 rounded-[5px]"
                placeholder="구매할 포인트 금액을 입력해주세요."
                value={point}
                onChange={e => setPoint(e.target.value)}
              />
              <PaymentCheckoutPage point={point} />
            </div>
            <div className="absolute top-0 right-0 flex justify-end mt-3 mr-3">
              <button
                className="text-black w-5 h-5"
                onClick={() => {
                  setIsOpen({ buy: false, refund: false });
                  setPoint("");
                }}
              >
                <IoMdClose className="w-full h-full" />
              </button>
            </div>
          </div>
        </div>
      )}
      {isOpen.refund && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold flex justify-center mb-10">
              아따빠르네 포인트환불
            </h2>
            <div className="flex gap-5">
              <input
                type="number"
                className="w-[250px] border border-darkGray px-2 rounded-[5px]"
                placeholder="환불할 포인트 금액을 입력해주세요."
                value={point}
                onChange={e => setPoint(e.target.value)}
              />
              <button
                type="button"
                onClick={() => {
                  if (Number(point)) {
                    postRefund();
                    setPoint("");
                  } else {
                    Swal.fire("0보다 큰 금액을 입력해 주세요.", "", "error");
                  }
                }}
                className="px-4 py-2 rounded-[5px] bg-lightGreen hover:bg-green text-white"
              >
                환불요청
              </button>
            </div>
            <div className="absolute top-0 right-0 flex justify-end mt-3 mr-3">
              <button
                className="text-black w-5 h-5"
                onClick={() => {
                  setIsOpen({ buy: false, refund: false });
                  setPoint("");
                }}
              >
                <IoMdClose className="w-full h-full" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CpTransaction;
