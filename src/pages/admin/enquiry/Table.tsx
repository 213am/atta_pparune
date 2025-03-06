import React, { useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import { RowClickedEvent } from "ag-grid-community";
import { IoIosArrowForward } from "react-icons/io";
import AdminHeader from "../../../components/AdminHeader";
import PieChart from "../enquiry/PieChart";
import BarChart from "../enquiry/BarChart";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { provideGlobalGridOptions } from "ag-grid-community";
import { ClientSideRowModelModule } from "ag-grid-community";
import { useNavigate } from "react-router-dom";

interface StoreManageProps {
  children?: React.ReactNode;
}

export type RowDataT = {
  id: number;
  date: string;
  manageYear: string;
  name: string;
  role: string;
  enquiryCode: string;
  isCompleted: string;
};

const Table = (props: StoreManageProps): JSX.Element => {
  const navigate = useNavigate();

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
      width: 200,
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
      width: 200,
    },
  ];

  const EMPTY_ROW_COUNT = 10;

  const emptyRows: RowDataT[] = Array.from(
    { length: EMPTY_ROW_COUNT },
    (_, index) => ({
      id: index + 1,
      date: "",
      manageYear: "",
      name: "",
      role: "",
      enquiryCode: "",
      isCompleted: "",
    }),
  );
  const rowDefs =
    tableData.length < EMPTY_ROW_COUNT
      ? [...tableData, ...emptyRows.slice(tableData.length)]
      : tableData;

  const enquiryDetailHandler = (e: RowClickedEvent<RowDataT>) => {
    if (e.data) {
      console.log("해당 게시글로 이동", e.data.id);
    } else {
      console.log("해당 게시글을 찾을 수 없습니다");
    }
  };

  return (
    <div className="relative flex flex-col w-full h-dvh bg-white">
      <AdminHeader title={"시스템 문의관리"} />
      <div className="flex flex-col w-full h-dvh overflow-x-hidden overflow-y-scroll scrollbar-hide">
        <div className="flex w-[100%] h-[45%] px-10 my-10 justify-center">
          <div className="flex flex-col w-[50%] h-full bg-white ">
            <span className="text-center text-xl pb-4">
              불만 접수 현황(누계)
            </span>
            <div className="flex w-full h-full justify-center">
              <PieChart />
            </div>
          </div>
          <div className="flex flex-col w-[50%] h-full bg-white">
            <span className="text-center text-xl pb-4">
              연도별 불만 처리 건수
            </span>
            <div className="flex w-full h-full justify-center">
              <BarChart />
            </div>
          </div>
        </div>

        <div className="flex flex-col w-[100%] h-[55%] px-10 py-4 bg-white items-start">
          <span className="flex w-full justify-center pb-6 text-xl">
            문의 및 불편사항 내역
          </span>
          <div className="flex ag-theme-alpine w-full h-full justify-center">
            <AgGridReact
              columnDefs={columnDefs}
              rowData={rowDefs}
              pagination={true}
              paginationPageSize={10}
              domLayout="print"
              modules={[ClientSideRowModelModule]}
              gridOptions={provideGlobalGridOptions({ theme: "legacy" })}
              onRowClicked={e => enquiryDetailHandler(e)}
            />
          </div>

          <div className="flex w-full justify-center items-center py-16 gap-6">
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
      </div>
    </div>
  );
};

export default Table;
