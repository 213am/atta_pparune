import { FaBuilding } from "react-icons/fa6";
import ServiceHeader from "../../components/ServiceHeader";
import { RiStore2Line } from "react-icons/ri";
import ServiceFooter from "../../components/ServiceFooter";
import { useNavigate } from "react-router-dom";

const EnrollServicePage = (): JSX.Element => {
  const navigate = useNavigate();
  return (
    <div className="relative w-full h-dvh bg-white overflow-y-auto z-10 scrollbar-hide">
      <ServiceHeader />
      <div className="flex justify-center mt-[200px] gap-[150px]">
        {/* 기업 제휴 신청 */}
        <div
          className="w-[500px] h-[400px] bg-black rounded-3xl text-white text-center flex flex-col gap-3 cursor-pointer"
          onClick={() => navigate("/service/enroll/addcompany")}
        >
          <div className="flex justify-center mt-10">
            <FaBuilding className="w-[200px] h-[200px]" />
          </div>
          <div className="text-[24px]">기업 식대 관리를 편하게 하고싶다면?</div>
          <div className="text-[40px]">기업 제휴 신청</div>
        </div>
        {/* 매장 입점 신청 */}
        <div
          className="w-[500px] h-[400px] bg-black rounded-3xl text-white text-center flex flex-col gap-3 cursor-pointer"
          onClick={() => navigate("/service/enroll/addstore")}
        >
          <div className="flex justify-center mt-10">
            <RiStore2Line className="w-[200px] h-[200px]" />
          </div>
          <div className="text-[24px]">매장 입점을 희망한다면?</div>
          <div className="text-[40px]">매장 입점 신청</div>
        </div>
      </div>
      <ServiceFooter />
    </div>
  );
};

export default EnrollServicePage;
