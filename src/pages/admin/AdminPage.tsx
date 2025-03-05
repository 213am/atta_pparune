import AdminSideBar from "../../components/AdminSideBar";
import Calculation from "./Calculation";

const AdminPage = (): JSX.Element => {
  const clickHandler = () => {
    console.log("1");
  };
  return (
    <div className="flex">
      <AdminSideBar onMenuClick={clickHandler} />
      <Calculation />
    </div>
  );
};
export default AdminPage;
