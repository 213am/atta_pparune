interface ServiceFooterProps {
  children?: React.ReactNode;
}

const ServiceFooter = (props: ServiceFooterProps): JSX.Element => {
  return (
    <div className="w-[100vw] z-20 bg-darkGray text-white pt-[30px] bottom-0 mt-[100px]">
      <div className="w-[150px] mx-[250px] text-center">
        <div className="w-[150px] cursor-pointer">
          <img src="/adminLogo.png" alt="" />
        </div>
        {/* <div className="text-[20px]">아따 빠르네</div> */}
      </div>
      <div className="mx-[250px] my-[20px] font-normal text-[14px]">
        <div>서울특별시 강남구 봉은사로 103길 5, 성재빌딩 4층</div>
        <div>
          (주)현대벤디스 | 대표이사: 조정호 | 사업자등록번호: 138-81-90354
        </div>
        <div>통신판매업 신고번호: 2017-서울강남-02579</div>
        <div>Email: biz@vendys.co.kr</div>
      </div>
      <div className="border-t border-black border-opacity-30 pt-[10px]">
        <div className="flex justify-between mx-[250px]">
          <div>© 2025. Atta Pparune All rights reserved.</div>
          <div className="flex gap-8 mb-[30px]">
            <div>서비스 소개</div>
            <div>서비스 문의</div>
            <div>공지/문의</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceFooter;
