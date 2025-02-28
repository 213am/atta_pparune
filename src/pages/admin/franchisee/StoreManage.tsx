import PieChart from "./PieChart";
import AdminHeader from "../../../components/AdminHeader";
import { IoIosArrowForward } from "react-icons/io";
import BarChart from "./BarChart";

interface StoreManageProps {
  children?: React.ReactNode;
}

type TabledataT = {
  id: number | null;
  date: string | null;
  manageYear: string | null;
  name: string | null;
  role: string | null;
  enquiryCode: string | null;
  isCompleted: string | null;
};

const StoreManage = (props: StoreManageProps): JSX.Element => {
  const tableData: TabledataT[] = [
    {
      id: 1,
      date: "2025-02-11",
      manageYear: "2025년",
      name: "홍길동",
      role: "사용자",
      enquiryCode: "불편사항",
      isCompleted: "답변완료",
    },
    {
      id: 2,
      date: "2025-02-11",
      manageYear: "2025년",
      name: "이길동",
      role: "회사 관리자",
      enquiryCode: "문의사항",
      isCompleted: "답변예정",
    },
    {
      id: 3,
      date: "2025-02-12",
      manageYear: "2025년",
      name: "박길동",
      role: "식당 관리자",
      enquiryCode: "불편사항",
      isCompleted: "답변예정",
    },
    {
      id: 4,
      date: "2025-02-12",
      manageYear: "2025년",
      name: "최길동",
      role: "식당 관리자",
      enquiryCode: "문의사항",
      isCompleted: "답변예정",
    },
    {
      id: 5,
      date: "2025-02-13",
      manageYear: "2025년",
      name: "김길동",
      role: "사용자",
      enquiryCode: "불편사항",
      isCompleted: "답변예정",
    },
    {
      id: 6,
      date: "2025-02-13",
      manageYear: "2025년",
      name: "장길동",
      role: "사용자",
      enquiryCode: "불편사항",
      isCompleted: "답변예정",
    },
    {
      id: 7,
      date: "2025-02-14",
      manageYear: "2025년",
      name: "정길동",
      role: "사용자",
      enquiryCode: "문의사항",
      isCompleted: "답변예정",
    },
    {
      id: null,
      date: null,
      manageYear: null,
      name: null,
      role: null,
      enquiryCode: null,
      isCompleted: null,
    },
    {
      id: null,
      date: null,
      manageYear: null,
      name: null,
      role: null,
      enquiryCode: null,
      isCompleted: null,
    },
    {
      id: null,
      date: null,
      manageYear: null,
      name: null,
      role: null,
      enquiryCode: null,
      isCompleted: null,
    },
    {
      id: null,
      date: null,
      manageYear: null,
      name: null,
      role: null,
      enquiryCode: null,
      isCompleted: null,
    },
    {
      id: null,
      date: null,
      manageYear: null,
      name: null,
      role: null,
      enquiryCode: null,
      isCompleted: null,
    },
    {
      id: null,
      date: null,
      manageYear: null,
      name: null,
      role: null,
      enquiryCode: null,
      isCompleted: null,
    },
    {
      id: null,
      date: null,
      manageYear: null,
      name: null,
      role: null,
      enquiryCode: null,
      isCompleted: null,
    },
    {
      id: null,
      date: null,
      manageYear: null,
      name: null,
      role: null,
      enquiryCode: null,
      isCompleted: null,
    },
  ];

  return (
    <div className="relative flex flex-col w-full h-dvh bg-white overflow-hidden">
      <AdminHeader title={"시스템 문의관리"} />
      <div className="flex w-full h-[92%]">
        <div className="flex flex-col w-[50%] h-[95%] px-10 py-4 bg-white items-start">
          <span className="flex w-full justify-center pb-6 text-xl">
            문의 및 불편사항 내역
          </span>
          <table className="flex flex-col w-full border border-collapse">
            {/* 표 분류 */}
            <thead className="pointer-events-none">
              <tr className="flex w-full justify-between">
                <th className="flex border w-[10%] justify-center">순번</th>
                <th className="flex border w-[20%] justify-center">접수일자</th>
                <th className="flex border w-[15%] justify-center">관리년도</th>
                <th className="flex border w-[15%] justify-center">고객명</th>
                <th className="flex border w-[20%] justify-center">
                  사용자 구분
                </th>
                <th className="flex border w-[15%] justify-center">
                  문의 구분
                </th>
                <th className="flex border w-[15%] justify-center">
                  처리 상태
                </th>
              </tr>
            </thead>
            {/* 표 내용 */}
            <tbody>
              {tableData.map((item, index) => (
                <tr className="flex w-full justify-between" key={index}>
                  <td className="flex border w-[10%] min-h-8 justify-center items-center">
                    {item.id}
                  </td>
                  <td className="flex border w-[20%] min-h-8 justify-center items-center">
                    {item.date}
                  </td>
                  <td className="flex border w-[15%] min-h-8 justify-center items-center">
                    {item.manageYear}
                  </td>
                  <td className="flex border w-[15%] min-h-8 justify-center items-center">
                    {item.name}
                  </td>
                  <td className="flex border w-[20%] min-h-8 justify-center items-center">
                    {item.role}
                  </td>
                  <td className="flex border w-[15%] min-h-8 justify-center items-center">
                    {item.enquiryCode}
                  </td>
                  <td className="flex border w-[15%] min-h-8 justify-center items-center">
                    {item.isCompleted}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex w-full justify-center items-center py-6 gap-6">
            <span
              onClick={() => console.log("1페이지로 이동")}
              className="cursor-pointer"
            >
              1
            </span>
            <span
              onClick={() => console.log("2페이지로 이동")}
              className="cursor-pointer"
            >
              2
            </span>
            <span
              onClick={() => console.log("3페이지로 이동")}
              className="cursor-pointer"
            >
              3
            </span>
            <span
              onClick={() => console.log("4페이지로 이동")}
              className="cursor-pointer"
            >
              4
            </span>
            <IoIosArrowForward
              onClick={() => console.log("다음으로 이동")}
              className="cursor-pointer"
            />
          </div>
        </div>
        <div className="flex flex-col w-[50%] h-full px-10 py-6 gap-20">
          <div className="flex flex-col w-full h-[45%] justify-center bg-white ">
            <span className="text-center text-xl pb-4">
              불만 접수 현황(누계)
            </span>
            <div className="flex w-full h-full justify-center">
              <PieChart />
            </div>
          </div>
          <div className="flex flex-col w-full h-[45%] justify-center bg-white">
            <span className="text-center text-xl pb-4">
              연도별 불만 처리 건수
            </span>
            <BarChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreManage;
