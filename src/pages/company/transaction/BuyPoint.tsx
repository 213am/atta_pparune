/* eslint-disable @typescript-eslint/no-explicit-any */
import { AgGridReact } from "ag-grid-react";
import {
  ClientSideRowModelModule,
  ColDef,
  GridOptions,
} from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import type { PaginationProps } from "antd";
import { Pagination } from "antd";
import { getCookie } from "../../../components/cookie";

interface BuyPointType {
  id: number;
  createdAt: string;
  pointAmount: string;
}

const BuyPoint = (): JSX.Element => {
  const [pointList, setPointList] = useState<BuyPointType[]>([]);
  const [totalPage, setTotalPage] = useState(0);
  const accessToken = getCookie();
  const companyId = sessionStorage.getItem("companyId");

  const EMPTY_ROW_COUNT = 15;
  const tableData = pointList;

  // 구매 포인트 내용 오른쪽 정렬
  const PointAmountRenderer = (props: any) => {
    return (
      <div className="text-right">
        <span className="text-green font-bold italic">+{props.value}</span>
      </div>
    );
  };

  const emptyRows: BuyPointType[] = Array.from(
    { length: EMPTY_ROW_COUNT },
    (_, index) => ({
      id: index + 1,
      createdAt: "",
      pointAmount: "",
    }),
  );
  const rowDefs =
    tableData.length < EMPTY_ROW_COUNT
      ? [...tableData, ...emptyRows.slice(tableData.length)]
      : tableData;

  const columnDefs: ColDef<BuyPointType>[] = [
    {
      headerName: "순번",
      field: "id",
      sortable: true,
      filter: true,
      width: 100,
    },
    {
      headerName: "구매날짜",
      field: "createdAt",
      sortable: true,
      filter: true,
      width: 200,
    },
    {
      headerName: "구매포인트",
      field: "pointAmount",
      sortable: true,
      filter: true,
      width: 150,
      cellRenderer: PointAmountRenderer,
    },
  ];

  const getBuyPoint = async (page: number) => {
    const params = {
      page: page,
      size: 15,
      companyId,
    };
    try {
      const res = await axios.get("/api/admin/company/v3/purchaseHistory", {
        params,
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      console.log("구매내역 조회", res.data.resultData);
      setTotalPage(res.data.resultData.totalPageCount);

      // `id`가 없는 데이터를 index + 1로 추가
      const formattedData = res.data.resultData.historyList.map(
        (item: Omit<BuyPointType, "id">, index: number) => ({
          pointAmount: `${item.pointAmount.toLocaleString()}`,
          createdAt: dayjs(item.createdAt).format("YYYY-MM-DD HH:mm"),
          id: index + 1, // 인덱스를 기반으로 ID 추가
        }),
      );
      console.log("이거 먼데", formattedData);

      setPointList(formattedData);
    } catch (error) {
      console.log(error);
    }
  };

  // antDesign
  const itemRender: PaginationProps["itemRender"] = (
    _,
    type,
    originalElement,
  ) => {
    if (type === "prev") {
      return <a>{`<`}</a>;
    }
    if (type === "next") {
      return <a>{`>`}</a>;
    }
    return originalElement;
  };

  const handlePageChange = (page: number) => {
    getBuyPoint(page);
  };

  const gridOptions: GridOptions = {
    pagination: true,
    rowSelection: "multiple",
  };

  useEffect(() => {
    getBuyPoint(1);
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <h1 className="font-bold">포인트 구매내역</h1>
      <div className="ag-theme-alpine flex flex-col justify-center text-center">
        <AgGridReact
          columnDefs={columnDefs}
          rowData={rowDefs}
          domLayout="print"
          modules={[ClientSideRowModelModule]}
          theme={"legacy"}
          gridOptions={gridOptions}
        />
      </div>
      <div className="flex justify-center">
        <Pagination
          total={totalPage * 15}
          itemRender={itemRender}
          showSizeChanger={false}
          onChange={handlePageChange}
          pageSize={15}
        />
      </div>
    </div>
  );
};
export default BuyPoint;
