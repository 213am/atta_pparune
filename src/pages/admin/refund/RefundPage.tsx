import AdminSideBar from "../../../components/AdminSideBar";
import Refund from "./Refund";

const RefundPage = (): JSX.Element => {
  const clickHandler = () => {
    console.log("5 : 환불내역");
  };
  return (
    <div className="flex">
      <AdminSideBar onMenuClick={clickHandler} />
      <Refund />
    </div>
  );
};

export default RefundPage;
