import {
  ClientSideRowModelModule,
  ColDef,
  GridOptions,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { getCookie } from "../../../components/cookie";

interface PointHistoryI {
  id: number | null;
  adminId: number | null;
  cashAmount: number | string;
  code: string;
  codeName: string;
  companyId: number | null;
  createdAt: string;
  name: string;
  note: string;
  pk: number | null;
  pointAmount: number | string;
  userId: number | null;
}

const PointHistory = (): JSX.Element => {
  const [pointList, setPointList] = useState<PointHistoryI[]>([]);
  const accessToken = getCookie();
  const adminId = sessionStorage.getItem("adminId");
  const tableData = pointList;

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

        const result = res.data.resultData.map(
          (data: PointHistoryI, index: number) => ({
            ...data,
            id: index + 1,
            code: data.code === "00301" ? "지급" : "회수",
            name: data.name === null ? "회사" : data.name,
            createdAt: dayjs(data.createdAt).format("YYYY-MM-DD HH:mm"),
            cashAmount: data.cashAmount.toLocaleString("ko-kr"),
            pointAmount: data.pointAmount.toLocaleString("ko-kr"),
          }),
        );
        setPointList(result);
      } catch (error) {
        console.log(error);
      }
    };
    getEnquiryData();
  }, []);

  // 포인트 및 금액 정렬 및 색상
  const pointAmountRenderer = (props: any) => {
    console.log("얼마지? : ", props);

    return (
      <div className="text-right">
        {props.value === "0" ? (
          <span className="text-black font-bold italic">{props.value}</span>
        ) : props.data.codeName === "지급" ? (
          <span className="text-red font-bold italic">-{props.value}</span>
        ) : (
          <span className="text-green font-bold italic">+{props.value}</span>
        )}
      </div>
    );
  };

  const cashAmountRenderer = (props: any) => {
    console.log("얼마지? : ", props);

    return (
      <div className="text-right">
        {props.value === "0" ? (
          <span className="text-black font-bold italic">{props.value}</span>
        ) : props.data.codeName === "구매" ? (
          <span className="text-red font-bold italic">-{props.value}</span>
        ) : (
          <span className="text-green font-bold italic">+{props.value}</span>
        )}
      </div>
    );
  };

  const columnDefs: ColDef<PointHistoryI>[] = [
    {
      headerName: "순번",
      field: "id",
      sortable: true,
      filter: true,
      width: 80,
    },
    {
      headerName: "이름",
      field: "name",
      sortable: true,
      filter: true,
      width: 100,
    },
    {
      headerName: "포인트",
      field: "pointAmount",
      sortable: true,
      filter: true,
      width: 100,
      cellRenderer: pointAmountRenderer,
    },
    {
      headerName: "현금",
      field: "cashAmount",
      sortable: true,
      filter: true,
      width: 100,
      cellRenderer: cashAmountRenderer,
    },
    {
      headerName: "일시",
      field: "createdAt",
      sortable: true,
      filter: true,
      width: 150,
    },
    {
      headerName: "구분",
      field: "codeName",
      sortable: true,
      filter: true,
      width: 100,
    },
  ];

  const EMPTY_ROW_COUNT = 15;

  const emptyRows: PointHistoryI[] = Array.from(
    { length: EMPTY_ROW_COUNT },
    (_, index) => ({
      id: index + 1,
      adminId: null,
      name: "",
      pointAmount: "",
      cashAmount: "",
      createdAt: "",
      code: "",
      codeName: "",
      note: "",
      pk: null,
      userId: null,
      companyId: null,
    }),
  );
  const rowDefs =
    tableData.length < EMPTY_ROW_COUNT
      ? [...tableData, ...emptyRows.slice(tableData.length)]
      : tableData;

  const gridOptions: GridOptions = {
    pagination: true,
    rowSelection: "multiple",
  };

  return (
    <div className="flex w-1/2 pb-20">
      <div className="flex flex-col w-[95%] p-10 gap-10 bg-white shadow-2xl rounded-md">
        <span className="flex w-full h-[10%] justify-start text-3xl">
          최근 포인트 거래내역
        </span>
        <div>
          <div className="ag-theme-alpine flex flex-col justify-center text-center">
            <AgGridReact
              columnDefs={columnDefs}
              rowData={rowDefs}
              domLayout="autoHeight"
              modules={[ClientSideRowModelModule]}
              theme={"legacy"}
              gridOptions={gridOptions}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PointHistory;
