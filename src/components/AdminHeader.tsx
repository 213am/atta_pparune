import axios from "axios";
import { useEffect } from "react";
import { getCookie } from "./cookie";
import dayjs from "dayjs";
import { useRecoilState } from "recoil";
import { pointState } from "../atoms/companyPointAtom";

interface AdminHeaderI {
  title: string;
}

const AdminHeader = ({ title }: AdminHeaderI) => {
  const accessToken = getCookie();
  const companyId = sessionStorage.getItem("companyId");
  const date = dayjs(new Date()).format("YYYY-MM");
  const [point, setPoint] = useRecoilState<string>(pointState);

  const getPoint = async () => {
    const params = { companyId, date };
    try {
      const res = await axios.get(
        "/api/admin/company/dashboard/v3/Transaction",
        {
          params,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      sessionStorage.setItem("point", res.data.resultData.currentPoint);
      setPoint(res.data.resultData.currentPoint.toLocaleString());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("포인트!!!!!!!!!", point);
    getPoint();
  }, [point]);

  return (
    <div className="abosolute top-0 left-0 flex w-full h-[75px] min-h-[75px] border-b justify-between items-center px-10 bg-white">
      <div>
        <span className="text-2xl font-semibold tracking-widest">{title}</span>
      </div>
      <div className="flex items-center gap-5">
        <div className="font-bold flex gap-2 items-center">
          <div className="flex gap-2 items-center">
            <div className="w-6 h-6 flex items-center justify-center rounded-full bg-green text-white font-bold text-[12px]">
              P
            </div>
          </div>
          <span className="font-normal">{point || 0}P</span>
        </div>
        <img
          src="/profile.jpeg"
          alt=""
          className="flex w-10 h-10 rounded-full cursor-pointer"
        />
      </div>
    </div>
  );
};
export default AdminHeader;
