import AdminHeader from "../../../components/AdminHeader";
import BuyPoint from "./BuyPoint";
import SendPoint from "./SendPoint";
import { PaymentCheckoutPage } from "./toss/PaymentCheckoutPage";

const CpTransaction = (): JSX.Element => {
  return (
    <div className="relative flex flex-col w-full h-dvh bg-white">
      <AdminHeader title="거래내역" />
      <div className="px-10 py-5 bg-gray w-[100%] h-[100vh]">
        <div className="absolute right-0 mr-10">
          <PaymentCheckoutPage />
        </div>
        <div className="flex gap-20">
          <BuyPoint />
          <SendPoint />
        </div>
      </div>
    </div>
  );
};

export default CpTransaction;
