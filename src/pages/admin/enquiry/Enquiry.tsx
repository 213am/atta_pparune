import {
  ClientSideRowModelModule,
  ColDef,
  RowClickedEvent,
} from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridReact } from "ag-grid-react";
import { IoIosArrowForward } from "react-icons/io";
import AdminHeader from "../../../components/AdminHeader";
import BarChart from "./BarChart";
import PieChart from "./PieChart";
import { useEffect, useState } from "react";
import axios from "axios";
import { getCookie } from "../../../components/cookie";

export type RowDataT = {
  id: number;
  date: string;
  manageYear: string;
  name: string;
  role: string;
  enquiryCode: string;
  isCompleted: string;
};

const Enquiry = (): JSX.Element => {
  // const navigate = useNavigate();
  const [enqCount, setEnqCount] = useState<number[]>([]);
  const accessToken = getCookie();

  useEffect(() => {
    const getEnquiryCount = async () => {
      try {
        const res = await axios.get("/api/admin/system/v3/systemPost-count", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log("get 요청 성공 : ", res.data.resultData);
        const result = res.data.resultData;
        const countArr = [
          result.countForInconvenience ?? 0,
          result.countForInquiry ?? 0,
        ];
        setEnqCount([...countArr]);
      } catch (error) {
        console.log(error);
      }
    };
    getEnquiryCount();
    getEnquiryList();
  }, []);

  const getEnquiryList = async () => {
    try {
      const res = await axios.get(
        "/api/admin/system/v3/systemPost-management?page=1&size=15",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      console.log(res.data.resultData);
    } catch (error) {
      console.log(error);
    }
  };

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

  const columnDefs: ColDef<RowDataT>[] = [
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
              <PieChart enqCount={enqCount} />
            </div>
          </div>
          <div className="flex flex-col w-[50%] h-full bg-white">
            <span className="text-center text-xl pb-4">
              연도별 불만 처리 건수
            </span>
            <div className="flex w-full h-full justify-center">
              <BarChart enqCount={enqCount} />
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
              theme={"legacy"}
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

export default Enquiry;
