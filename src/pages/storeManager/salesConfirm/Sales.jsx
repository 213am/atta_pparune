import SalesConfirm from "./SalesConfirm";
import SideBar from "../SideBar";

const Sales = () => {
  return (
    <div className="flex w-full h-dvh overflow-hidden scrollbar-hide justify-between">
      <SideBar />
      <SalesConfirm />
    </div>
  );
};
export default Sales;
