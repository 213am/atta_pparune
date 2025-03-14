import { useEffect } from "react";
import CompanySideBar from "./CompanySideBar";

const CompanyLayout = ({ children }) => {
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
