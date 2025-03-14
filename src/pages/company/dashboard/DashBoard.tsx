import AdminHeader from "../../../components/AdminHeader";
import EnquiryHistory from "./EnquiryHistory";
import PointChart from "./PointChart";
import PointHistory from "./PointHistory";

const DashBoard = (): JSX.Element => {
  return (
    <div className="relative flex flex-col w-full h-dvh bg-gray overflow-x-hidden overflow-y-scroll scrollbar-hide">
      <AdminHeader title="대시보드" />
      <div className="flex flex-col gap-20">
        <PointChart />
        <div className="flex justify-center">
          <EnquiryHistory />
          <PointHistory />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
