const SideBarRight = () => {
  return (
    <div className="flex flex-col w-1/3 h-dvh border-l-2 bg-white border-l-gray shadow-xl">
      <div className="w-100% h-dvh">
        <div className="flex w-100% h-100% flex-col text-center pt-10 text-2xl">
          주문 상세
        </div>
        <ul className="flex flex-col w-100% h-100% gap-4 pt-6 pl-10 text-nowrap">
          <li className="flex gap-6 ">
            <span className="text-darkGray">주문번호</span>
            <span>0001</span>
          </li>
          <li className="flex gap-6">
            <span className="text-darkGray">주문자명</span>
            <span>홍길동</span>
          </li>
          <li className="flex gap-6">
            <span className="text-darkGray">주문일시</span>
            <span className="tracking-wide">01-03 13:47</span>
          </li>
          <li className="flex gap-6">
            <span className="text-darkGray">주문메뉴</span>
            <div className="w-100% min-h-20 h-40 overflow-hidden">
              <div className="flex gap-4 pb-1">
                <span className="">돼지 국밥</span>
                <span className="tracking-widest">x1</span>
              </div>
              <div className="pb-3 text-darkGray">내장 섞어서</div>
              <div className="flex gap-4 pb-1">
                <span className="">돼지 국밥</span>
                <span className="tracking-widest">x1</span>
              </div>
              <div className="flex gap-4 pb-1">
                <span className="">돼지 국밥</span>
                <span className="tracking-widest">x1</span>
              </div>
            </div>
          </li>
          <li className="flex gap-6">
            <span className="text-darkGray">주문총액</span>
            <span className="whitespace-break-spaces">27,000원</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default SideBarRight;
