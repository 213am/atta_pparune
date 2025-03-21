import { useEffect } from "react";
import SideBar from "./SideBar";
import Table from "./tableManage/Table";

const StorePage = () => {
  // useEffect(() => {
  //   const hasRefreshed = sessionStorage.getItem("hasRefreshed");

  //   if (!hasRefreshed) {
  //     sessionStorage.setItem("hasRefreshed", "true");
  //     window.location.reload();
  //   }
  // }, []);

  return (
    <div className="flex w-full h-dvh overflow-hidden scrollbar-hide justify-between">
      <SideBar />
      <Table />
      {/* <SideBarRight /> */}
    </div>
  );
};
export default StorePage;
