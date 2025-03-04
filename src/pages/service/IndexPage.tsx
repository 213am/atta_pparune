import ServiceHeader from "../../components/ServiceHeader";

interface IndexPageProps {
  children?: React.ReactNode;
}

const IndexPage = (props: IndexPageProps): JSX.Element => {
  return (
    <div className="relative w-full h-dvh bg-white overflow-hidden z-10">
      <ServiceHeader />
      <div className="fixed -top-[600px] -right-60 w-[1500px] h-[1500px] rounded-full bg-gradient-to-tr from-sky-100 to-purple-200 blur-sm shadow-lg z-10"></div>
      <div className="absolute flex w-full h-full z-10">
        <div className="flex flex-col w-1/2 justify-center items-center">
          <span className="w-full text-center">서비스 소개글</span>
          <button className="w-[10%] bg-darkGray">제휴 신청</button>
        </div>
        <div className="flex w-1/2 justify-center items-center gap-10">
          <img
            src="/mobile_frame.jpg"
            alt=""
            className="outline outline-white"
          />
          <div className="flex flex-col text-4xl gap-10">
            <span>예약부터</span>
            <span>결제까지</span>
            <span>atta pparune</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
