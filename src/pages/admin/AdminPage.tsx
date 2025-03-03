import AdminSideBar from "../../components/AdminSideBar";
import StoreManage from "./franchisee/StoreManage";

const AdminPage = (): JSX.Element => {
  return (
    <div className="flex">
      <AdminSideBar />
      <StoreManage />
    </div>
  );
};
export default AdminPage;
