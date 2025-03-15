import AdminHeader from "../../../components/AdminHeader";
import JoinMember from "./JoinMember";

const Account = (): JSX.Element => {
  return (
    <div className="relative flex flex-col w-full h-dvh bg-white">
      <AdminHeader title="계정 관리" />
      <div className="flex flex-col w-full h-[90%] gap-20 p-20">
        <JoinMember />
      </div>
    </div>
  );
};

export default Account;
