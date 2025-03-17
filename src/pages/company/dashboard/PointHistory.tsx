import { ClientSideRowModelModule, ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { getCookie } from "../../../components/cookie";

interface PointHistoryI {
  id: number | null;
  adminId: number | null;
  cashAmount: number | null;
  code: string;
  codeName: string;
  companyId: number | null;
  createdAt: string;
  name: string;
  note: string;
  pk: number | null;
  pointAmount: number | null;
  userId: number | null;
}

const PointHistory = (): JSX.Element => {
  // const [enqCount, setEnqCount] = useState<number[]>([]);
  const [pointList, _setPointList] = useState<PointHistoryI[]>([]);
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
      } catch (error) {
        console.log(error);
      }
    };
    getEnquiryData();
  }, []);

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
      headerName: "금액",
      field: "pointAmount",
      sortable: true,
      filter: true,
      width: 100,
    },
    {
      headerName: "일시",
      field: "createdAt",
      sortable: true,
      filter: true,
      width: 100,
    },
    {
      headerName: "구분",
      field: "code",
      sortable: true,
      filter: true,
      width: 120,
    },
  ];

  const EMPTY_ROW_COUNT = 10;

  const emptyRows: PointHistoryI[] = Array.from(
    { length: EMPTY_ROW_COUNT },
    (_, index) => ({
      id: index + 1,
      adminId: null,
      name: "",
      pointAmount: null,
      cashAmount: null,
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

  // const enquiryDetailHandler = (e: RowClickedEvent<IEnquiryType>) => {
  //   if (e.data) {
  //     console.log("해당 게시글로 이동", e.data.id);
  //   } else {
  //     console.log("해당 게시글을 찾을 수 없습니다");
  //   }
  // };

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
