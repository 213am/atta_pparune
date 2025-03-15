import {
  ClientSideRowModelModule,
  ColDef,
  RowClickedEvent,
} from "ag-grid-community";
import { IEnquiryType } from "../../admin/enquiry/Enquiry";
import { getCookie } from "../../../components/cookie";
import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import axios from "axios";

const PointHistory = (): JSX.Element => {
  const [enqCount, setEnqCount] = useState<number[]>([]);
  const [enquiryList, setEnquiryList] = useState<IEnquiryType[]>([]);
  const accessToken = getCookie();
  const adminId = sessionStorage.getItem("adminId");
  const tableData = enquiryList;

  useEffect(() => {
    const getEnquiryData = async () => {
      const params = {
        adminId: adminId,
      };
      try {
        const res = await axios.get(
          "/api/admin/company/dashboard/v3/RecentAmount",
          {
            params,
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
        console.log("최근 포인트 거래내역 : ", res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getEnquiryData();
  }, []);

  const columnDefs: ColDef<IEnquiryType>[] = [
    {
      headerName: "순번",
      field: "id",
      sortable: true,
      filter: true,
      width: 80,
    },
    {
      headerName: "접수일자",
      field: "createdAt",
      sortable: true,
      filter: true,
      width: 100,
    },
    {
      headerName: "관리년도",
      field: "year",
      sortable: true,
      filter: true,
      width: 100,
    },
    {
      headerName: "고객명",
      field: "name",
      sortable: true,
      filter: true,
      width: 100,
    },
    {
      headerName: "사용자 구분",
      field: "roleCode",
      sortable: true,
      filter: true,
      width: 120,
    },
    {
      headerName: "문의 구분",
      field: "postCode",
      sortable: true,
      filter: true,
      width: 100,
    },
    {
      headerName: "처리 상태",
      field: "commentYn",
      sortable: true,
      filter: true,
      width: 150,
    },
  ];

  const EMPTY_ROW_COUNT = 10;

  const emptyRows: IEnquiryType[] = Array.from(
    { length: EMPTY_ROW_COUNT },
    (_, index) => ({
      id: "",
      commentYn: "",
      createdAt: "",
      inquiryId: "",
      name: "",
      postCode: "",
      roleCode: "",
      year: "",
    }),
  );
  const rowDefs =
    tableData.length < EMPTY_ROW_COUNT
      ? [...tableData, ...emptyRows.slice(tableData.length)]
      : tableData;

  const enquiryDetailHandler = (e: RowClickedEvent<IEnquiryType>) => {
    if (e.data) {
      console.log("해당 게시글로 이동", e.data.id);
    } else {
      console.log("해당 게시글을 찾을 수 없습니다");
    }
  };

  return (
    <div className="flex w-1/2 pb-20">
      <div className="flex flex-col w-[95%] p-10 gap-10 bg-white shadow-2xl rounded-md">
        <span className="flex w-full h-[10%] justify-start text-3xl">
          최근 포인트 거래내역
        </span>
        <div>
          <div className="ag-theme-alpine w-full h-full justify-start">
            <AgGridReact
              columnDefs={columnDefs}
              rowData={rowDefs}
              pagination={true}
              paginationPageSize={10}
              domLayout="autoHeight"
              modules={[ClientSideRowModelModule]}
              theme={"legacy"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PointHistory;
