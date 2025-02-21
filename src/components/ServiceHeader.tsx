import { IoMdLogIn } from "react-icons/io";

interface ServiceHeaderProps {
  children?: React.ReactNode;
}

const ServiceHeader = (props: ServiceHeaderProps): JSX.Element => {
  return (
    <div className="flex w-[90%] justify-between items-center absolute z-20 left-24">
      <div className="w-[12%] cursor-pointer">
        <img src="/logo.png" alt="" />
      </div>
      <ul className="flex px-10 py-4 gap-4 text-xl font-bold">
        <li className="px-4 py-1 cursor-pointer">서비스 소개</li>
        <li className="px-4 py-1 cursor-pointer">서비스 신청</li>
        <li className="px-4 py-1 cursor-pointer">공지 / 문의</li>
        <li className="flex items-center gap-1.5 px-4 py-1 cursor-pointer">
          <span>로그인</span>
          <IoMdLogIn />
        </li>
      </ul>
    </div>
  );
};

export default ServiceHeader;
