import AdminHeader from "../../../components/AdminHeader";
import Info from "./Info";

const AccountPage = (): JSX.Element => {
  return (
    <div className="relative flex flex-col w-full h-dvh bg-gray">
      <AdminHeader title="계정 관리" />
      <div className="flex w-full h-[90%] gap-20 px-10 py-5 overflow-x-hidden overflow-y-scroll scrollbar-hide">
        <Info />
      </div>
    </div>
  );
};

export default AccountPage;
