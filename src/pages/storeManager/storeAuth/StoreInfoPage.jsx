import SideBar from "../SideBar";
import StoreInfo from "./StoreInfo";

const StoreInfoPage = () => {
  return (
    <div className="flex w-full h-dvh overflow-hidden scrollbar-hide justify-between">
      <SideBar />
      <StoreInfo />
    </div>
  );
};
export default StoreInfoPage;
