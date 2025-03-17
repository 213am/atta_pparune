import AdminHeader from "../../../components/AdminHeader";
import EmployeeList from "./EmployeeList";

const Member = (): JSX.Element => {
  return (
    <div className="relative flex flex-col w-full h-dvh bg-white">
      <AdminHeader title="구성원 관리" />
      <div className="px-10 py-5 bg-gray w-[100%] h-[100vh]">
        <div className="flex">
          <EmployeeList />
        </div>
      </div>
    </div>
  );
};

export default Member;
