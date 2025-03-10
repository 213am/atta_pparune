import ServiceHeader from "../../components/ServiceHeader";

const IndexPage = (): JSX.Element => {
  return (
    <div className="relative w-full h-dvh bg-white overflow-hidden z-10">
      <ServiceHeader />
      <div className="fixed -top-[600px] -right-60 w-[1500px] h-[1500px] rounded-full bg-gradient-to-tr from-sky-100 to-purple-200 blur-sm shadow-lg z-10"></div>
      <div className="absolute flex w-full h-full z-10">
        <div className="flex flex-col w-1/2 justify-center items-center">
          <div className="w-full ml-52">
            <div className="text-[30px] font-bold mb-10">
              바쁜 직장인을 위한 최적의 점심 솔루션!
            </div>
            <div className="flex flex-col gap-2 text-[20px] mb-10">
              <div>
                점심시간마다 <span className="font-bold">"뭐 먹지?"</span>{" "}
                고민하고, 긴 줄 앞에서 시간 낭비하는 일이 지겹지 않나요?
              </div>
              <div>
                아따빠르네는 바쁜 직장인들을 위해 빠르고{" "}
                <span className="font-bold text-primary">편리한 식당 예약</span>
                과 <span className="font-bold">회사 식대 관리</span> 기능을 한
                곳에서 제공합니다.
              </div>
            </div>
            <div className="flex flex-col gap-2 bg-gray p-5 w-[820px] rounded-[10px] mb-5">
              <div>
                <span className="font-bold">빠른 식당 탐색 & 예약</span> – 내
                주변 인기 맛집을 한눈에 확인하고, 미리 예약하여 대기 시간을
                줄이세요.
              </div>
              <div>
                <span className="font-bold">간편한 식대 관리</span> – 회사
                차원에서 식대 지원을 효율적으로 운영하고, 직원들은 자동 정산
                기능으로 편리하게 이용할 수 있어요.
              </div>
              <div>
                <span className="font-bold">맞춤형 추천</span> – 직장인들이
                선호하는 식당과 메뉴를 분석해 최적의 맛집을 추천해 드립니다.
              </div>
            </div>
          </div>
          {/* <button className="w-[10%] bg-darkGray">제휴 신청</button> */}
        </div>
        <div className="flex w-1/2 justify-center items-center gap-20">
          <div className="flex flex-col text-4xl gap-7 text-center">
            <span className="italic">예약부터 결제까지</span>
            <img src="/logo.png" alt="" className="w-[300px]" />
          </div>
          <img
            src="/mobile_frame.jpg"
            alt=""
            className="outline outline-black rounded-[5px]"
          />
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
