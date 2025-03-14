import AdminSideBar from "../../../components/AdminSideBar";
import Enquiry from "./Enquiry";

const EnquiryPage = (): JSX.Element => {
  return (
    <div className="flex">
      <AdminSideBar />
      <Enquiry />
    </div>
  );
};
export default EnquiryPage;
