import AdminSideBar from "../../../components/AdminSideBar";
import Table from "./Table";

const Enquiry = (): JSX.Element => {
  const clickHandler = () => {
    console.log("4");
  };
  return (
    <div className="flex">
      <AdminSideBar onMenuClick={clickHandler} />
      <Table />
    </div>
  );
};
export default Enquiry;
