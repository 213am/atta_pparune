import { useNavigate, useSearchParams } from "react-router-dom";
import ServiceFooter from "../../../components/ServiceFooter";
import ServiceHeader from "../../../components/ServiceHeader";
import { useEffect } from "react";
import axios from "axios";

const DetailPage = (): JSX.Element => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const inquiryId = searchParams.get("inquiryId");

  const getBoardDetail = async () => {
    const params = {
      inquiryId,
    };
    try {
      await axios.get("/api/system/v3/post/detail", { params });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(inquiryId);
    getBoardDetail();
  }, []);

  return (
    <div className="relative w-full h-dvh bg-white overflow-y-auto scrollbar-hide z-10 flex flex-col">
      <ServiceHeader />
      <div className="mt-[100px] relative flex-grow">
        <div className="flex justify-center">
          <div className="w-[1280px] flex flex-col gap-3 mt-5">
            {/* 카테고리 */}
            <div className="text-[30px] border-b-2 border-darkGray pb-3 font-bold w-full">
              공지사항
            </div>

            {/* 제목 */}
            <div className="flex flex-col gap-2 border-b border-gray pb-2">
              <div className="text-[20px] font-bold">
                [공지] 공지사항입니다.
              </div>
              <div className="flex gap-3">
                <div>관리자</div>
                <div className="text-gray">|</div>
                <div>2025-02-17</div>
              </div>
            </div>

            {/* 내용 */}
            <div className="flex flex-col gap-3">
              <img src="/swiper1.webp" alt="" />
              <img src="/swiper2.webp" alt="" />
              <img src="/swiper3.webp" alt="" />
            </div>

            {/* 버튼 */}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => navigate(-1)}
                className="bg-gray text-black px-4 py-1 rounded-[5px]"
              >
                목록으로
              </button>
              <button className="bg-black text-white px-4 py-1 rounded-[5px]">
                수정
              </button>
              <button className="bg-black text-white px-4 py-1 rounded-[5px]">
                삭제
              </button>
            </div>
          </div>
        </div>
      </div>

      <ServiceFooter />
    </div>
  );
};
export default DetailPage;
