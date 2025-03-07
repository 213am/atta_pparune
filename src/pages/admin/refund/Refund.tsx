import { ClientSideRowModelModule, ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridReact } from "ag-grid-react";
import AdminHeader from "../../../components/AdminHeader";

export interface RowDataT {
  id: number;
  companyName: string;
  refundAmount: string;
  refundReason: string;
  refundStatus: string;
  refundDate: string;
  isCompleted: string;
}

const Refund = (): JSX.Element => {
  const tableData = [
    {
      id: 1,
      companyName: "그린컴퓨터아트학원",
      refundAmount: "900,000 원",
      refundReason: "제휴중지",
      refundStatus: "미환불",
      refundDate: "2025-02-20",
      isCompleted: "입금처리",
    },
    {
      id: 2,
      companyName: "그린컴퓨터아트학원",
      refundAmount: "2,100,000 원",
      refundReason: "제휴중지",
      refundStatus: "미환불",
      refundDate: "2025-02-20",
      isCompleted: "입금처리",
    },
    {
      id: 3,
      companyName: "그린컴퓨터아트학원",
      refundAmount: "1,200,000 원",
      refundReason: "제휴중지",
      refundStatus: "미환불",
      refundDate: "2025-02-20",
      isCompleted: "입금처리",
    },
    {
      id: 4,
      companyName: "그린컴퓨터아트학원",
      refundAmount: "1,000,000 원",
      refundReason: "제휴중지",
      refundStatus: "미환불",
      refundDate: "2025-02-20",
      isCompleted: "입금처리",
    },
    {
      id: 5,
      companyName: "그린컴퓨터아트학원",
      refundAmount: "1,500,000 원",
      refundReason: "제휴중지",
      refundStatus: "미환불",
      refundDate: "2025-02-20",
      isCompleted: "입금처리",
    },
    {
      id: 6,
      companyName: "그린컴퓨터아트학원",
      refundAmount: "2,000,000 원",
      refundReason: "제휴중지",
      refundStatus: "미환불",
      refundDate: "2025-02-20",
      isCompleted: "입금처리",
    },
    {
      id: 7,
      companyName: "그린컴퓨터아트학원",
      refundAmount: "1,000,000 원",
      refundReason: "제휴중지",
      refundStatus: "미환불",
      refundDate: "2025-02-20",
      isCompleted: "입금처리",
    },
  ];

  const EMPTY_ROW_COUNT = 10;

  // 빈 row를 생성
  const emptyRows: RowDataT[] = Array.from(
    { length: EMPTY_ROW_COUNT },
    (_, index) => ({
      id: index + 1,
      companyName: "",
      refundAmount: "",
      refundReason: "",
      refundStatus: "",
      refundDate: "",
      isCompleted: "",
    }),
  );

  const rowDefs =
    tableData.length < EMPTY_ROW_COUNT
      ? [...tableData, ...emptyRows.slice(tableData.length)]
      : tableData;

  const columnDefs: ColDef<RowDataT>[] = [
    {
      headerName: "순번",
      field: "id",
      sortable: true,
      filter: true,
      width: 100,
    },
    {
      headerName: "회사명",
      field: "companyName",
      sortable: true,
      filter: true,
      width: 200,
    },
    {
      headerName: "환불금액",
      field: "refundAmount",
      sortable: true,
      filter: true,
      width: 250,
    },
    {
      headerName: "환불사유",
      field: "refundReason",
      sortable: true,
      filter: true,
      width: 200,
    },
    {
      headerName: "환불 상태",
      field: "refundStatus",
      sortable: true,
      filter: true,
      width: 120,
    },
    {
      headerName: "환불 일자",
      field: "refundDate",
      sortable: true,
      filter: true,
      width: 150,
    },
    {
      headerName: "처리 상태",
      field: "isCompleted",
      sortable: true,
      filter: true,
      width: 200,
      cellRenderer: (params: any) => {
        const acceptClass =
          params.data.companyName !== ""
            ? "flex w-full h-[80%] justify-center items-center bg-blue text-white rounded-md px-2"
            : "";

        const rejectClass =
          params.data.companyName !== ""
            ? "flex w-full h-[80%] justify-center items-center bg-red text-white rounded-md px-2"
            : "";

        return (
          <>
            {params.data.companyName !== "" ? (
              <div className="flex w-full h-full items-center gap-4">
                <button
                  onClick={() => acceptHandler(params)}
                  className={acceptClass}
                >
                  환불수락
                </button>
                <button
                  onClick={() => rejectHandler(params)}
                  className={rejectClass}
                >
                  환불거절
                </button>
              </div>
            ) : (
              <></>
            )}
          </>
        );
      },
    },
  ];

  const acceptHandler = (params: any) => {
    console.log(`환불수락 : ${params.data.companyName}`);
  };

  const rejectHandler = (params: any) => {
    console.log(`환불거절 : ${params.data.companyName}`);
  };

  return (
    <div className="relative flex flex-col w-full h-dvh bg-white">
      <AdminHeader title={"환불내역"} />
      <div className="flex flex-col w-full h-dvh overflow-x-hidden overflow-y-scroll scrollbar-hide">
        <div className="flex ag-theme-alpine w-full h-full justify-start px-10 pt-10">
          <AgGridReact
            columnDefs={columnDefs}
            rowData={rowDefs}
            pagination={true}
            paginationPageSize={10}
            domLayout="print"
            modules={[ClientSideRowModelModule]}
            theme={"legacy"}
          />
        </div>
      </div>
    </div>
  );
};

export default Refund;
