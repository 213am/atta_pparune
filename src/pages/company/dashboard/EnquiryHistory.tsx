import {
  ClientSideRowModelModule,
  ColDef,
  RowClickedEvent,
} from "ag-grid-community";
import { getCookie } from "../../../components/cookie";
import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import axios from "axios";

interface IEnquiryType {
  id: string;
  enquiryTitle: string;
  createdAt: string;
  postCode: string;
  commentState: string;
}

const EnquiryHistory = (): JSX.Element => {
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
          "/api/admin/company/dashboard/v3/MySystemPost",
          {
            params,
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
        console.log("문의사항 내역 : ", res.data);
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
      headerName: "제목",
      field: "enquiryTitle",
      sortable: true,
      filter: true,
      width: 200,
    },
    {
      headerName: "작성일자",
      field: "createdAt",
      sortable: true,
      filter: true,
      width: 150,
    },
    {
      headerName: "종류",
      field: "postCode",
      sortable: true,
      filter: true,
      width: 100,
    },
    {
      headerName: "답변 여부",
      field: "commentState",
      sortable: true,
      filter: true,
      width: 100,
    },
  ];

  const EMPTY_ROW_COUNT = 10;

  const emptyRows: IEnquiryType[] = Array.from(
    { length: EMPTY_ROW_COUNT },
    (_, index) => ({
      id: "",
      enquiryTitle: "",
      createdAt: "",
      postCode: "",
      commentState: "",
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
          문의 내역
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

export default EnquiryHistory;
