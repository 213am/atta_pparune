import ServiceFooter from "../../../components/ServiceFooter";
import ServiceHeader from "../../../components/ServiceHeader";
import Question from "./Question";

const NoticePage = (): JSX.Element => {
  return (
    <div className="relative w-full h-dvh bg-white overflow-y-auto scrollbar-hide z-10 flex flex-col">
      <ServiceHeader />
      <div className=" mt-[100px] relative flex-grow">
        <Question />
      </div>

      <ServiceFooter />
    </div>
  );
};
export default NoticePage;
