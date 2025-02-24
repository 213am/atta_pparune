interface StoreManageProps {
  children?: React.ReactNode;
}

const StoreManage = (props: StoreManageProps): JSX.Element => {
  return (
    <div className="flex w-full h-dvh bg-white items-start">
      <table className="flex flex-col w-[70%] border border-collapse">
        <thead>
          <tr className="flex w-full justify-between">
            <th className="flex border w-[10%] justify-center">순번</th>
            <th className="flex border w-[20%] justify-center">가맹점명</th>
            <th className="flex border w-[20%] justify-center">이메일</th>
            <th className="flex border w-[15%] justify-center">전화번호</th>
            <th className="flex border w-[25%] justify-center">주소</th>
            <th className="flex border w-[10%] justify-center">제휴상태</th>
          </tr>
        </thead>
        <tbody>
          <tr className="flex w-full justify-between">
            <td className="flex border w-[10%] justify-center">1</td>
            <td className="flex border w-[20%] justify-center">후라토식당</td>
            <td className="flex border w-[20%] justify-center">
              hurato12@naver.com
            </td>
            <td className="flex border w-[15%] justify-center">
              010-1234-5678
            </td>
            <td className="flex border w-[25%] justify-center">
              대구광역시 어쩌구 한교동
            </td>
            <td className="flex border w-[10%] justify-center">제휴</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default StoreManage;
