import AdminSideBar from "../../../components/AdminSideBar";
import Refund from "./Refund";

const RefundPage = (): JSX.Element => {
  return (
    <div className="flex">
      <AdminSideBar />
      <Refund />
    </div>
  );
};

export default RefundPage;
