import AdminSideBar from "../../../components/AdminSideBar";
import DepositHistory from "./DepositHistory";
// import PointHistory from "./PointHistory";

const TransactionPage = (): JSX.Element => {
  const clickHandler = () => {
    console.log("2 : 거래내역");
  };
  return (
    <div className="flex">
      <AdminSideBar onMenuClick={clickHandler} />
      <DepositHistory />
      {/* <PointHistory /> */}
    </div>
  );
};

export default TransactionPage;
