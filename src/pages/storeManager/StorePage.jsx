import SideBar from "./SideBar";
import Table from "./tableManage/Table";

const StorePage = () => {
  return (
    <div className="flex w-full h-dvh overflow-hidden scrollbar-hide justify-between">
      <SideBar />
      <Table />
      {/* <SideBarRight /> */}
    </div>
  );
};
export default StorePage;
