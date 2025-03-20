import ServiceFooter from "../../components/ServiceFooter";
import ServiceHeader from "../../components/ServiceHeader";

const NoticePage = (): JSX.Element => {
  return (
    <div className="relative w-full h-dvh bg-white overflow-y-auto overflow-x-hidden z-10 flex flex-col">
      <ServiceHeader />
      <div className="mt-[100px] relative flex-grow">
        <div className="flex gap-36">
          {/* 메뉴 */}
          <div className="ml-[130px] mt-14">
            <div className="text-[26px] mb-5">아따 빠르네 사용자 가이드</div>
            <div className="flex gap-8">
              <div className="flex flex-col">
                <div className="w-[3px] h-full bg-primary" />
                <div className="w-[3px] h-full bg-gray" />
                <div className="w-[3px] h-full bg-gray" />
                <div className="w-[3px] h-full bg-gray" />
                <div className="w-[3px] h-full bg-gray" />
                <div className="w-[3px] h-full bg-gray" />
                <div className="w-[3px] h-full bg-gray" />
                <div className="w-[3px] h-full bg-gray" />
                <div className="w-[3px] h-full bg-gray" />
                <div className="w-[3px] h-full bg-gray" />
                <div className="w-[3px] h-full bg-gray" />
              </div>
              <div className="flex flex-col cursor-pointer">
                <div className="py-3">1. 홈화면</div>
                {/* 서브 메뉴 */}
                <div>
                  <div className="px-4 py-3">1-1. 홈화면</div>
                  <div className="px-4 py-3">1-2. 사용자 알림</div>
                </div>

                <div className="py-3">2. 식당 찾기</div>
                <div className="py-3">3. 식당 선택</div>
                <div className="py-3">4. 이용방식 선택</div>
                <div className="py-3">5. 시간 및 인원 선택</div>
                <div className="py-3">6. 함께 결제할 사용자 추가</div>
                <div className="py-3">7. 사용자별 결제 요청</div>
                <div className="py-3">8. 결제 승인상태 확인</div>
                <div className="py-3">9. 식권 생성하기</div>
              </div>
            </div>
          </div>
          {/* 내용 */}
          <div>
            <div className="text-[12px] mb-1">아따 빠르네 사용자 가이드</div>
            <div className="text-[24px]">1-1. 홈 화면</div>
            <div className="flex flex-col gap-3 my-5">
              <div>
                <span className="text-[12px]">①</span> 식당 카테고리를 클릭 시,
                해당하는 유형의 식당을 볼 수 있습니다.
              </div>
              <div>
                <span className="text-[12px]">②</span> 기본순, 리뷰순,
                평균식사시간순 등 정렬방식을 선택할 수 있습니다.
              </div>
              <div>
                <span className="text-[12px]">③</span> 마우스 휠을 내릴 시,
                이어서 다음 식당목록이 표시됩니다.
              </div>
            </div>
            <div>
              <img src="/guide1.PNG" alt="" draggable="false" />
            </div>
          </div>
        </div>
      </div>
      <ServiceFooter />
    </div>
  );
};
export default NoticePage;
