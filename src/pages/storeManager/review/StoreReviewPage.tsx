import styled from "@emotion/styled";
import { FaStar } from "react-icons/fa";
import SideBar from "../SideBar";
import { PiSirenFill } from "react-icons/pi";

const LayoutDiv = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #eee;
  max-height: 100vh;
  height: auto;
  overflow: hidden;
`;

const ContentDiv = styled.div`
  margin-top: 32px;
  flex-wrap: wrap;
  padding: 20px 30px;
  padding-bottom: 30px;
  border-radius: 10px;
  width: 830px;
  max-height: calc(100vh - 60px);
  overflow-y: auto;
  background-color: #fff;
`;

const TitleDiv = styled.div`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 20px;
`;

const SideBarRightDiv = styled.div`
  box-shadow:
    0px 20px 25px -5px rgba(0, 0, 0, 0.1),
    0px 10px 10px -5px rgba(0, 0, 0, 0.04);
  width: 350px;
  background-color: #fff;
`;

function StoreReviewPage(): JSX.Element {
  // 별점 상태
  const rating = 5;

  return (
    <div>
      <LayoutDiv>
        <SideBar />
        <ContentDiv className="scrollbar-hide">
          <TitleDiv>리뷰관리</TitleDiv>
          <div className="border-gray border mb-5"></div>
          <div className="mb-2 text-[18px]">전체 별점</div>
          <div className="flex gap-3 items-center mb-3">
            <FaStar className="text-yellow" />
            <div className="font-bold">4.8</div>
            <div className="text-darkGray">(총 리뷰 1,111개)</div>
          </div>
          <div className="inline-flex gap-3 items-center border border-gray px-4 py-2 rounded-[5px] mb-10">
            <div className="text-darkGray">조회기간</div>
            <input type="date" />
            <div>~</div>
            <input type="date" />
          </div>
          {/* map 사용하기 */}
          <div>
            <div className="flex gap-5">
              <div>
                <div className="font-bold mb-2">건물주 고양이</div>
                <div className="flex gap-3 items-center">
                  <div className="font-bold text-[20px]">5.0</div>
                  <div className="flex gap-2">
                    {[...Array(5)].map((_, index) => {
                      const starIndex = index + 1;
                      return (
                        <FaStar
                          key={starIndex}
                          className={`w-[20px] h-[20px] ${starIndex <= rating ? "text-yellow" : "text-gray"}`}
                        />
                      );
                    })}
                  </div>
                </div>
                <div className="mt-2 text-darkGray">2025-02-23</div>
              </div>
              <div>
                <div>양도 많고 감자도 잘 튀겨졌어요~~~ 역시 최고 !!</div>
                <div className="flex w-[300px] my-3 gap-1">
                  <img
                    src="/swiper1.jpg"
                    className="flex w-1/3 rounded-[5px]"
                    alt=""
                  />
                  <img
                    src="/swiper2.jpg"
                    className="flex w-1/3 rounded-[5px]"
                    alt=""
                  />
                  <img
                    src="/swiper3.jpg"
                    className="flex w-1/3 rounded-[5px]"
                    alt=""
                  />
                </div>
                <div className="mb-3">
                  모짜렐라인더 버거-베이컨 세트 1개, 양념감자(양파맛) 2개
                </div>
                <button className="px-4 py-2 bg-primary text-white rounded-sm">
                  댓글쓰기
                </button>
              </div>
              <div className="flex gap-2 items-center cursor-pointer ml-24 text-red h-4">
                <PiSirenFill className="w-[20px] h-[20px]" />
                <div>신고하기</div>
              </div>
            </div>
            <div className="border-gray border my-5"></div>
          </div>
          <div>
            <div className="flex gap-5">
              <div>
                <div className="font-bold mb-2">건물주 고양이</div>
                <div className="flex gap-3 items-center">
                  <div className="font-bold text-[20px]">5.0</div>
                  <div className="flex gap-2">
                    {[...Array(5)].map((_, index) => {
                      const starIndex = index + 1;
                      return (
                        <FaStar
                          key={starIndex}
                          className={`w-[20px] h-[20px] ${starIndex <= rating ? "text-yellow" : "text-gray"}`}
                        />
                      );
                    })}
                  </div>
                </div>
                <div className="mt-2 text-darkGray">2025-02-23</div>
              </div>
              <div>
                <div>양도 많고 감자도 잘 튀겨졌어요~~~ 역시 최고 !!</div>
                <div className="flex w-[300px] my-3 gap-1">
                  <img
                    src="/swiper1.jpg"
                    className="flex w-1/3 rounded-[5px]"
                    alt=""
                  />
                  <img
                    src="/swiper2.jpg"
                    className="flex w-1/3 rounded-[5px]"
                    alt=""
                  />
                  <img
                    src="/swiper3.jpg"
                    className="flex w-1/3 rounded-[5px]"
                    alt=""
                  />
                </div>
                <div className="mb-3">
                  모짜렐라인더 버거-베이컨 세트 1개, 양념감자(양파맛) 2개
                </div>
                <button className="px-4 py-2 bg-primary text-white rounded-sm">
                  댓글쓰기
                </button>
              </div>
              <div className="flex gap-2 items-center cursor-pointer ml-24 text-red h-4">
                <PiSirenFill className="w-[20px] h-[20px]" />
                <div>신고하기</div>
              </div>
            </div>
            <div className="border-gray border my-5"></div>
          </div>
          <div>
            <div className="flex gap-5">
              <div>
                <div className="font-bold mb-2">건물주 고양이</div>
                <div className="flex gap-3 items-center">
                  <div className="font-bold text-[20px]">5.0</div>
                  <div className="flex gap-2">
                    {[...Array(5)].map((_, index) => {
                      const starIndex = index + 1;
                      return (
                        <FaStar
                          key={starIndex}
                          className={`w-[20px] h-[20px] ${starIndex <= rating ? "text-yellow" : "text-gray"}`}
                        />
                      );
                    })}
                  </div>
                </div>
                <div className="mt-2 text-darkGray">2025-02-23</div>
              </div>
              <div>
                <div>양도 많고 감자도 잘 튀겨졌어요~~~ 역시 최고 !!</div>
                <div className="flex w-[300px] my-3 gap-1">
                  <img
                    src="/swiper1.jpg"
                    className="flex w-1/3 rounded-[5px]"
                    alt=""
                  />
                  <img
                    src="/swiper2.jpg"
                    className="flex w-1/3 rounded-[5px]"
                    alt=""
                  />
                  <img
                    src="/swiper3.jpg"
                    className="flex w-1/3 rounded-[5px]"
                    alt=""
                  />
                </div>
                <div className="mb-3">
                  모짜렐라인더 버거-베이컨 세트 1개, 양념감자(양파맛) 2개
                </div>
                <button className="px-4 py-2 bg-primary text-white rounded-sm">
                  댓글쓰기
                </button>
              </div>
              <div className="flex gap-2 items-center cursor-pointer ml-24 text-red h-4">
                <PiSirenFill className="w-[20px] h-[20px]" />
                <div>신고하기</div>
              </div>
            </div>
            <div className="border-gray border my-5"></div>
          </div>
        </ContentDiv>
        {/* 블랙리스트 관리 */}
        <SideBarRightDiv>
          <TitleDiv
            style={{
              textAlign: "center",
              marginTop: 40,
            }}
          >
            블랙리스트 관리
          </TitleDiv>
        </SideBarRightDiv>
      </LayoutDiv>
    </div>
  );
}
export default StoreReviewPage;
