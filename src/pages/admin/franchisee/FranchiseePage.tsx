import AdminSideBar from "../../../components/AdminSideBar";
import Franchisee from "./Franchisee";

const FranchiseePage = (): JSX.Element => {
  const clickHandler = () => {
    console.log("3 : 가맹점관리");
  };
  return (
    <div className="flex">
      <AdminSideBar onMenuClick={clickHandler} />
      <Franchisee />
    </div>
  );
};

export default FranchiseePage;
