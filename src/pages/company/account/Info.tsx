import axios from "axios";
import { useEffect, useState } from "react";
import { getCookie } from "../../../components/cookie";
import { addHypenFunction } from "../../../components/addHypen";
import ChangePassword from "./ChangePassword";
import JoinMember from "./JoinMember";

interface ICompanyInfo {
  adminId: number;
  companyId: number;
  aid: string;
  companyAddress: string;
  companyCeoName: string;
  companyName: string;
  email: string;
  phone: string;
  coalitionState: number | string;
}

const Info = (): JSX.Element => {
  const adminId = sessionStorage.getItem("adminId");
  const accessToken = getCookie();
  const [companyInfo, setCompanyInfo] = useState<ICompanyInfo>();

  useEffect(() => {
    const getCompanyInfo = async () => {
      const params = {
        adminId: adminId,
      };
      try {
        const res = await axios.get(`/api/admin/company/v3/info`, {
          params,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log(res.data);
        const result = res.data.resultData;
        setCompanyInfo({
          ...result,
          phone: addHypenFunction(result?.phone),
          coalitionState: result.coalitionState === 0 ? "제휴" : "제휴 중지",
        });
      } catch (error) {
        console.log(error);
      }
    };
    getCompanyInfo();
  }, []);

  return (
    <div className="relative flex flex-col w-full h-dvh gap-5">
      <span className="font-bold">회사 정보</span>
      <div className="flex w-full h-full rounded-sm justify-between items-center bg-white p-10">
        <div className="flex flex-col w-1/2 h-full">
          <div className="flex flex-col gap-10">
            <div className="flex gap-5 items-center">
              <span className="flex w-1/5 text-darkGray text-nowrap">
                회사명
              </span>
              <span className="flex text-2xl">{companyInfo?.companyName}</span>
            </div>
            <div className="flex gap-5 items-center">
              <span className="flex w-1/5 text-darkGray text-nowrap">
                사업장 소재지
              </span>
              <span className="flex text-2xl">
                {companyInfo?.companyAddress}
              </span>
            </div>
            <div className="flex gap-5 items-center">
              <span className="flex w-1/5 text-darkGray text-nowrap">
                회사 이메일
              </span>
              <span className="flex text-2xl">{companyInfo?.email}</span>
            </div>
            <div className="flex gap-5 items-center">
              <span className="flex w-1/5 text-darkGray text-nowrap">
                대표자 성함
              </span>
              <span className="flex text-2xl">
                {companyInfo?.companyCeoName}
              </span>
            </div>
            <div className="flex gap-5 items-center">
              <span className="flex w-1/5 text-darkGray text-nowrap">
                대표자 연락처
              </span>
              <span className="flex text-2xl">{companyInfo?.phone}</span>
            </div>
            <div className="flex gap-5 items-center">
              <span className="flex w-1/5 text-darkGray text-nowrap">
                제휴 상태
              </span>
              <span className="flex text-2xl">
                {companyInfo?.coalitionState}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-1/2 h-full gap-10 items-center">
          <JoinMember />
          <ChangePassword />
        </div>
      </div>
    </div>
  );
};

export default Info;
