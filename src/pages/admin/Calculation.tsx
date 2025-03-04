import AdminHeader from "../../components/AdminHeader";
import { AgGridReact } from "ag-grid-react";
import { CellClickedEvent } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { provideGlobalGridOptions } from "ag-grid-community";
import { ClientSideRowModelModule } from "ag-grid-community";

interface CalculationProps {
  children?: React.ReactNode;
}

export interface RowDataT {
  id: number;
  salesPeriod: string;
  restaurantName: string;
  sales: string;
  depositStatus: string;
  endDate: string;
  isCompleted: string;
}

const Calculation = (props: CalculationProps): JSX.Element => {
  const tableData = [
    {
      id: 1,
      salesPeriod: "2025-02-14 ~ 2025-02-20",
      restaurantName: "동양백반",
      sales: "900,000 원",
      depositStatus: "미입금",
      endDate: "2025-02-20",
      isCompleted: "입금처리",
    },
    {
      id: 2,
      salesPeriod: "2025-02-14 ~ 2025-02-20",
      restaurantName: "멘지",
      sales: "2,100,000 원",
      depositStatus: "미입금",
      endDate: "2025-02-20",
      isCompleted: "입금처리",
    },
    {
      id: 3,
      salesPeriod: "2025-02-14 ~ 2025-02-20",
      restaurantName: "미분당",
      sales: "1,200,000 원",
      depositStatus: "미입금",
      endDate: "2025-02-20",
      isCompleted: "입금처리",
    },
    {
      id: 4,
      salesPeriod: "2025-02-14 ~ 2025-02-20",
      restaurantName: "장어죽집",
      sales: "1,000,000 원",
      depositStatus: "미입금",
      endDate: "2025-02-20",
      isCompleted: "입금처리",
    },
    {
      id: 5,
      salesPeriod: "2025-02-14 ~ 2025-02-20",
      restaurantName: "맥도날드",
      sales: "1,500,000 원",
      depositStatus: "미입금",
      endDate: "2025-02-20",
      isCompleted: "입금처리",
    },
    {
      id: 6,
      salesPeriod: "2025-02-14 ~ 2025-02-20",
      restaurantName: "시골집",
      sales: "2,000,000 원",
      depositStatus: "미입금",
      endDate: "2025-02-20",
      isCompleted: "입금처리",
    },
    {
      id: 7,
      salesPeriod: "2025-02-14 ~ 2025-02-20",
      restaurantName: "빽다방",
      sales: "1,000,000 원",
      depositStatus: "미입금",
      endDate: "2025-02-20",
      isCompleted: "입금처리",
    },
  ];

  const EMPTY_ROW_COUNT = 10;

  const emptyRows: RowDataT[] = Array.from(
    { length: EMPTY_ROW_COUNT },
    (_, index) => ({
      id: index + 1,
      salesPeriod: "",
      restaurantName: "",
      sales: "",
      depositStatus: "",
      endDate: "",
      isCompleted: "",
    }),
  );

  emptyRows.push({
    id: 1,
    salesPeriod: "2025-02-14 ~ 2025-02-20",
    restaurantName: "동양백반",
    sales: "900,000 원",
    depositStatus: "미입금",
    endDate: "2025-02-20",
    isCompleted: "입금처리",
  });

  const rowDefs = tableData.length > 10 ? tableData : emptyRows;

  const columnDefs = [
    {
      headerName: "순번",
      field: "id",
      sortable: true,
      filter: true,
      width: 100,
    },
    {
      headerName: "매출기간",
      field: "salesPeriod",
      sortable: true,
      filter: true,
      width: 250,
    },
    {
      headerName: "식당명",
      field: "restaurantName",
      sortable: true,
      filter: true,
      width: 200,
    },
    {
      headerName: "매출액",
      field: "sales",
      sortable: true,
      filter: true,
      width: 200,
    },
    {
      headerName: "입금 상태",
      field: "depositStatus",
      sortable: true,
      filter: true,
      width: 120,
    },
    {
      headerName: "최종 결제일",
      field: "endDate",
      sortable: true,
      filter: true,
      width: 150,
    },
    {
      headerName: "처리 상태",
      field: "isCompleted",
      sortable: true,
      filter: true,
      width: 120,
    },
  ];

  return (
    <div className="relative flex flex-col w-full h-dvh bg-white">
      <AdminHeader title={"정기정산"} />
      <div className="flex flex-col w-full h-dvh overflow-x-hidden overflow-y-scroll scrollbar-hide">
        <div className="flex flex-col w-[100%] h-[10%] px-10 pt-10 bg-white items-start">
          이번 주 정산 내역
        </div>
        <div className="flex ag-theme-alpine w-full h-full justify-start px-10">
          <AgGridReact
            columnDefs={columnDefs}
            rowData={rowDefs}
            pagination={true}
            paginationPageSize={10}
            domLayout="print"
            modules={[ClientSideRowModelModule]}
            gridOptions={provideGlobalGridOptions({ theme: "legacy" })}
          />
          <div className="absolute top-0 right-0">입금처리</div>
        </div>
      </div>
    </div>
  );
};

export default Calculation;
