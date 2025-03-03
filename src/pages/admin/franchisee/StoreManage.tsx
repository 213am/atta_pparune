import React from "react";
import { AgGridReact } from "ag-grid-react";
import { IoIosArrowForward } from "react-icons/io";
import AdminHeader from "../../../components/AdminHeader";
import PieChart from "./PieChart";
import BarChart from "./BarChart";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { provideGlobalGridOptions } from "ag-grid-community";
import { ClientSideRowModelModule } from "ag-grid-community";

interface StoreManageProps {
  children?: React.ReactNode;
}

const StoreManage = (props: StoreManageProps): JSX.Element => {
  const tableData = [
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
  ];

  const columnDefs = [
    {
      headerName: "순번",
      field: "id",
      sortable: true,
      filter: true,
      width: 100,
    },
    {
      headerName: "접수일자",
      field: "date",
      sortable: true,
      filter: true,
      width: 150,
    },
    {
      headerName: "관리년도",
      field: "manageYear",
      sortable: true,
      filter: true,
      width: 150,
    },
    {
      headerName: "고객명",
      field: "name",
      sortable: true,
      filter: true,
      width: 150,
    },
    {
      headerName: "사용자 구분",
      field: "role",
      sortable: true,
      filter: true,
      width: 200,
    },
    {
      headerName: "문의 구분",
      field: "enquiryCode",
      sortable: true,
      filter: true,
      width: 200,
    },
    {
      headerName: "처리 상태",
      field: "isCompleted",
      sortable: true,
      filter: true,
      width: 150,
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

          {/* AG Grid component with custom width and height */}
          <div className="ag-theme-alpine w-full h-full">
            <AgGridReact
              columnDefs={columnDefs}
              rowData={tableData}
              pagination={true}
              paginationPageSize={5}
              domLayout="autoHeight"
              modules={[ClientSideRowModelModule]}
              gridOptions={provideGlobalGridOptions({ theme: "legacy" })}
            />
          </div>

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
            <div className="flex w-full h-full justify-center">
              <BarChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreManage;
