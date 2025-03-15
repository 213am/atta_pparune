import { AgGridReact } from "ag-grid-react";
import { ClientSideRowModelModule, ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { Pagination } from "antd";
import type { PaginationProps } from "antd";

interface SendPointType {
  id: number;
  createdAt: string;
  pointAmount: string;
  name: string;
}

const SendPoint = (): JSX.Element => {
  const [pointList, setPointList] = useState<SendPointType[]>([]);
  const [totalPage, setTotalPage] = useState(0);
  const EMPTY_ROW_COUNT = 15;
  const tableData = pointList;

  // 입금 포인트 내용 오른쪽 정렬
  const PointAmountRenderer = (props: any) => {
    return (
      <div className="text-right">
        <span className="text-red font-bold italic">-{props.value}</span>
      </div>
    );
  };

  const emptyRows: SendPointType[] = Array.from(
    { length: EMPTY_ROW_COUNT },
    (_, index) => ({
      id: index + 1,
      createdAt: "",
      pointAmount: "",
      name: "",
    }),
  );
  const rowDefs =
    tableData.length < EMPTY_ROW_COUNT
      ? [...tableData, ...emptyRows.slice(tableData.length)]
      : tableData;

  const columnDefs: ColDef<SendPointType>[] = [
    {
      headerName: "순번",
      field: "id",
      sortable: true,
      filter: true,
      width: 100,
    },
    {
      headerName: "사원명",
      field: "name",
      sortable: true,
      filter: true,
      width: 150,
    },
    {
      headerName: "입금날짜",
      field: "createdAt",
      sortable: true,
      filter: true,
      width: 200,
    },
    {
      headerName: "입금포인트",
      field: "pointAmount",
      sortable: true,
      filter: true,
      width: 150,
      cellRenderer: PointAmountRenderer,
    },
  ];

  const getSendPoint = async (page: number) => {
    const params = {
      page: page,
      size: 15,
      companyId: 1,
    };
    try {
      const res = await axios.get("/api/admin/company/v3/depositDetail", {
        params,
      });
      // console.log("입금내역 조회", res.data.resultData.totalPageCount);
      setTotalPage(res.data.resultData.totalPageCount);
      // `id`가 없는 데이터를 index + 1로 추가
      const formattedData = res.data.resultData.historyList.map(
        (item: Omit<SendPointType, "id">, index: number) => ({
          ...item,
          pointAmount: `${item.pointAmount.toLocaleString()}`,
          createdAt: dayjs(item.createdAt).format("YYYY-MM-DD HH:mm"),
          id: index + 1, // 인덱스를 기반으로 ID 추가
        }),
      );
      // console.log("이거 먼데", formattedData);

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
    getSendPoint(page);
  };

  useEffect(() => {
    getSendPoint(1);
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <h1 className="font-bold">포인트 입금내역</h1>
      <div className="ag-theme-alpine text-center">
        <AgGridReact
          columnDefs={columnDefs}
          rowData={rowDefs}
          domLayout="print"
          modules={[ClientSideRowModelModule]}
          theme={"legacy"}
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
export default SendPoint;
