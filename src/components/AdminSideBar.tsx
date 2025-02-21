import { ReactNode } from "react";

interface AdminSideBarProps {
  children?: ReactNode;
}

const AdminSideBar = ({ children }: AdminSideBarProps): JSX.Element => {
  return (
    <div className="bg-black w-[200px] h-[100vh] py-3">
      <div className="w-[130px] h-[20px] mx-4">
        <img src="/adminLogo.png" className="w-full h-full" />
      </div>
      <div></div>
    </div>
  );
};
export default AdminSideBar;
