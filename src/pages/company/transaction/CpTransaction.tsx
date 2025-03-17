import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import AdminHeader from "../../../components/AdminHeader";
import BuyPoint from "./BuyPoint";
import SendPoint from "./SendPoint";
import { PaymentCheckoutPage } from "./toss/PaymentCheckoutPage";

const CpTransaction = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [point, setPoint] = useState("");

  return (
    <div className="relative flex flex-col w-full h-dvh bg-white">
      <AdminHeader title="거래내역" />
      <div className="px-10 py-5 bg-gray w-[100%] h-[100vh]">
        <div className="absolute right-0 mr-10">
          <button
            onClick={() => setIsOpen(true)}
            className="px-4 py-2 rounded-[5px] bg-primary text-white"
          >
            포인트구매
          </button>
        </div>
        <div className="mt-5 flex gap-20">
          <BuyPoint />
          <SendPoint />
        </div>
      </div>
      {isOpen && (
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
                  setIsOpen(false);
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
