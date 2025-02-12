import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";
import { IoMdArrowBack, IoMdSearch } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import {
  memberDataAtom,
  orderIdAtom,
  paymentMemberAtom,
} from "../../../atoms/restaurantAtom";
import { userDataAtom } from "../../../atoms/userAtom";
import { getCookie } from "../../../components/cookie";

const Seatmate = () => {
  const [userData, setUserData] = useRecoilState(userDataAtom);
  const [paymentMember, setPaymentMember] = useRecoilState(memberDataAtom);
  const [memberData, setMemberData] = useRecoilState(paymentMemberAtom);
  const [newOrderId, setNewOrderId] = useRecoilState(orderIdAtom);
  const [isSearch, setIsSearch] = useState(true);
  const [searchResult, setSearchResult] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const { state } = useLocation();
  const navigate = useNavigate();
  const userId = sessionStorage.getItem("userId");
  const accessToken = getCookie();

  useEffect(() => {
    const params = {
      userId: userId,
    };
    const getUserData = async () => {
      try {
        const res = await axios.get(`/api/user`, {
          params,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log(res.data.resultData);
        const result = res.data.resultData;
        setUserData({ ...result });
        setMemberData(prev => {
          const loginMemberData = [...prev];
          loginMemberData[0] = {
            name: result.name,
            uid: result.uid,
            userId: result.userId,
          };
          return loginMemberData;
        });
        setPaymentMember(prev => {
          const userIdList = prev.userId || [];
          const isSelected = userIdList.includes(result.userId);
          return {
            ...prev,
            userId: isSelected
              ? userIdList.filter(id => id !== result.userId)
              : [...userIdList, result.userId],
          };
        });
      } catch (error) {
        console.log(error);
      }
    };
    getUserData();
  }, []);

  useEffect(() => {
    const searchMember = async (name = inputValue) => {
      const accessToken = getCookie();
      const params = {
        companyId: userData.companyId,
        page: 1,
        size: 30,
        name: name,
      };
      console.log(params);

      try {
        const res = await axios.get(
          "/api/user/user-payment-member/searchPeople",
          {
            params,
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
        const result = res.data.resultData.memberList;
        setSearchResult([...result]);
      } catch (error) {
        console.log(error);
      }
    };
    searchMember();
  }, [inputValue]);

  const searchMember = async (name = inputValue) => {
    const accessToken = getCookie();
    const params = {
      companyId: userData.companyId,
      page: 1,
      size: 30,
      name: name,
    };
    console.log(params);

    try {
      const res = await axios.get(
        "/api/user/user-payment-member/searchPeople",
        {
          params,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      const result = res.data.resultData.memberList;
      setSearchResult([...result]);
    } catch (error) {
      console.log(error);
    }
  };

  const changeInputHandler = e => {
    const searchTarget = e.target.value;

    setInputValue(searchTarget);
  };

  const onKeyDownHandler = e => {
    console.log(e);
    console.log(inputValue);

    if (e.code === "Enter") {
      searchMember();
    }
  };

  const changeCheckHandler = e => {
    const userId = e.userId; // 또는 e.target.value 등 적절한 방식으로 userId 추출

    // setPaymentMember 업데이트
    setPaymentMember(prev => {
      const userIds = prev.userId || []; // 기본값으로 빈 배열 설정
      const isSelected = userIds.includes(userId);
      return {
        ...prev,
        userId: isSelected
          ? userIds.filter(id => id !== userId) // 선택 해제
          : [...userIds, userId], // 선택 추가
      };
    });

    // setMemberData 업데이트
    setMemberData(prev => {
      const updatedMembers = prev.filter(member => member.userId !== userId);
      // userId가 없는 경우 새 멤버 추가
      if (updatedMembers.length === prev.length) {
        return [...prev, e];
      }
      return updatedMembers;
    });
  };

  console.log(paymentMember);
  console.log(memberData);

  const nextBtnHandler = () => {
    navigate(`/user/placetoorder/price/${newOrderId}`, {
      state: {
        orderId: newOrderId,
      },
    });
  };

  return (
    <div className="w-full h-dvh overflow-x-hidden overflow-y-scroll scrollbar-hide">
      <div className="flex w-full justify-between py-6 items-center border-b border-gray">
        <div
          onClick={() => navigate(-1)}
          className="flex w-[15%] justify-center"
        >
          <IoMdArrowBack className="text-3xl" />
        </div>
        <span className="text-lg font-semibold">인원 선택</span>
        <div className="w-[15%]">
          <span
            className="bg-primary text-center px-3 py-1 rounded-md text-white"
            onClick={nextBtnHandler}
          >
            다음
          </span>
        </div>
      </div>
      <div className="flex w-full justify-between p-4">
        <div className="flex">
          <span
            className={`${isSearch ? "bg-gray text-darkGray text-opacity-60" : "bg-darkGray text-black"} px-2 py-1 rounded-s-md font-semibold`}
            onClick={() => setIsSearch(false)}
          >
            최근
          </span>
          <span
            className={`${isSearch ? "bg-darkGray text-black" : "bg-gray text-darkGray text-opacity-60"} px-2 py-1 rounded-e-md font-semibold`}
            onClick={() => setIsSearch(true)}
          >
            검색
          </span>
        </div>
        <div>총 {paymentMember.userId.length}명 선택 중</div>
      </div>
      <div className="w-full h-dvh ">
        <div className="flex w-full h-[6%] items-center px-6 border-b border-gray">
          <div className="flex w-[90%] items-center gap-4">
            <input type="checkbox" className="w-5 h-5" checked disabled />
            <label className="text-xl">
              {userData.name}({userData.uid})
            </label>
          </div>
          <span className="w-[20%] text-darkGray">필수선택</span>
        </div>
        {isSearch ? (
          <div className="flex flex-col w-full h-dvh">
            <div className="flex p-6 items-center gap-1">
              <input
                type="text"
                className="w-[90%] border border-darkGray rounded-md px-2"
                placeholder="회사 내 인원을 이름으로 검색해보세요"
                onChange={e => changeInputHandler(e)}
                onKeyDown={e => onKeyDownHandler(e)}
                value={inputValue}
              />
              <IoMdSearch
                onClick={() => searchMember()}
                className="flex w-[10%] text-2xl"
              />
            </div>
            <div className="flex flex-col w-full h-dvh">
              {searchResult.map(item => (
                <div
                  key={item.userId}
                  className="flex w-full h-[6%] items-center gap-4 px-6 border-b border-gray"
                >
                  <input
                    type="checkbox"
                    className="w-5 h-5"
                    id={item.userId}
                    value={item.userId}
                    onChange={() => changeCheckHandler(item)}
                  />
                  <label className="text-xl" htmlFor={item.userId}>
                    {item.name}({item.uid})
                  </label>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col w-full h-dvh">
            <span className="p-5 text-xl">최근 함께한 사용자가 없습니다</span>
          </div>
        )}
      </div>
    </div>
  );
};
export default Seatmate;
