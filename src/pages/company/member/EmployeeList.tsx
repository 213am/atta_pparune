/* eslint-disable @typescript-eslint/no-explicit-any */
import { ClientSideRowModelModule, ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridReact } from "ag-grid-react";
import { Pagination, PaginationProps } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { getCookie } from "../../../components/cookie";

interface EmployeeListType {
  id: number;
  uid: string;
  name: string;
  phone: string;
  email: string;
  point: string;
  activation: number;
}

const EmployeeList = (): JSX.Element => {
  const [data, setData] = useState<EmployeeListType[]>([]);
  const [totalPage, setTotalPage] = useState(0);
  const companyId = sessionStorage.getItem("companyId");
  const adminId = sessionStorage.getItem("adminId");
  const accessToken = getCookie();

  const EMPTY_ROW_COUNT = 15;
  const tableData = data;

  // 입금 포인트 내용 오른쪽 정렬
  const PointRenderer = (props: any) => {
    return (
      <div className="text-right">
        <span className="font-bold italic">{props.value}</span>
      </div>
    );
  };

  const emptyRows: EmployeeListType[] = Array.from(
    { length: EMPTY_ROW_COUNT },
    (_, index) => ({
      id: index + 1,
      uid: "10000001",
      name: "홍길동",
      phone: "010-1234-5678",
      email: "test@gmail.com",
      point: "100,000,000",
      activation: 0,
    }),
  );

  const rowDefs =
    tableData.length < EMPTY_ROW_COUNT
      ? [...tableData, ...emptyRows.slice(tableData.length)]
      : tableData;

  const columnDefs: ColDef<EmployeeListType>[] = [
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
      headerName: "사원번호",
      field: "uid",
      sortable: true,
      filter: true,
      width: 200,
    },
    {
      headerName: "이메일",
      field: "email",
      sortable: true,
      filter: true,
      width: 200,
    },
    {
      headerName: "휴대폰번호",
      field: "phone",
      sortable: true,
      filter: true,
      width: 200,
    },

    {
      headerName: "잔여포인트",
      field: "point",
      sortable: true,
      filter: true,
      width: 150,
      cellRenderer: PointRenderer,
    },
  ];

  const getSendPoint = async (page: number) => {
    const params = {
      searchFilter: "",
      companyId,
      adminId,
      page,
      size: 15,
    };
    try {
      const res = await axios.get("/api/admin/company/v3/employee", {
        params,
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setTotalPage(res.data.resultData.totalPageCount);

      console.log(res);

      // 폰번호 하이픈 추가
      const formatPhoneNumber = (value: string) => {
        if (!value) return ""; // 빈 값 예외 처리
        value = value.replace(/\D/g, ""); // 숫자만 남기기
        if (value.length <= 3) return value;
        if (value.length <= 7) return `${value.slice(0, 3)}-${value.slice(3)}`;
        return `${value.slice(0, 3)}-${value.slice(3, 7)}-${value.slice(7, 11)}`;
      };

      // `id`가 없는 데이터를 index + 1로 추가
      const formattedData = res.data.resultData.employeeList.map(
        (item: Omit<EmployeeListType, "id">, index: number) => ({
          ...item,
          point: `${item.point.toLocaleString()}`,
          phone: formatPhoneNumber(item.phone),
          id: index + 1, // 인덱스를 기반으로 ID 추가
        }),
      );
      console.log("이거 먼데", formattedData);

      setData(formattedData);
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
      <h1 className="font-bold">사원 목록</h1>
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
export default EmployeeList;
