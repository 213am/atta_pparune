import AdminSideBar from "../../../components/AdminSideBar";
import Enquiry from "./Enquiry";

const EnquiryPage = (): JSX.Element => {
  const clickHandler = () => {
    console.log("4");
  };
  return (
    <div className="flex">
      <AdminSideBar onMenuClick={clickHandler} />
      <Enquiry />
    </div>
  );
};
export default EnquiryPage;
