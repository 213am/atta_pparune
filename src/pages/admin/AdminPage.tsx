import AdminSideBar from "../../components/AdminSideBar";
import Calculation from "./Calculation";

const AdminPage = (): JSX.Element => {
  return (
    <div className="flex">
      <AdminSideBar />
      <Calculation />
    </div>
  );
};
export default AdminPage;
