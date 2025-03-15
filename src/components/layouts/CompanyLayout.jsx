import { useEffect } from "react";
import CompanySideBar from "./CompanySideBar";

const CompanyLayout = ({ children }) => {
  const adminId = sessionStorage.getItem("adminId");
  const companyId = sessionStorage.getItem("companyId");

  if (!adminId && !companyId) {
    console.log("비로그인 상태 입니다");
  } else {
    console.log("로그인 중입니다");
  }

  useEffect(() => {
    document.body.classList.add("company-layout");
    return () => document.body.classList.remove("company-layout");
  }, []);

  return (
    <div className="flex company-layout w-full bg-white overflow-y-scroll overflow-x-hidden scrollbar-hide">
      <CompanySideBar />
      {children}
    </div>
  );
};
export default CompanyLayout;
