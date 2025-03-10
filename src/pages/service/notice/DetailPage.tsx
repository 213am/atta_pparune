import { useNavigate } from "react-router-dom";
import ServiceFooter from "../../../components/ServiceFooter";
import ServiceHeader from "../../../components/ServiceHeader";

const DetailPage = (): JSX.Element => {
  const navigate = useNavigate();
  return (
    <div className="relative w-full h-dvh bg-white overflow-y-auto scrollbar-hide z-10 flex flex-col">
      <ServiceHeader />
      <div className="mt-[100px] relative flex-grow">
        <div className="flex justify-center">
          <div className="w-[1280px]">
            <div className="text-[30px] border-b border-darkGray pb-5 font-bold w-full">
              문의사항
            </div>
          </div>
        </div>
      </div>

      <ServiceFooter />
    </div>
  );
};
export default DetailPage;
