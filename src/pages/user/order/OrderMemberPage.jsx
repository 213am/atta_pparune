import axios from "axios";
import { useEffect, useState } from "react";
import { IoMdArrowBack, IoMdSearch } from "react-icons/io";
import { useLocation, useNavigate, useParams } from "react-router-dom";
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
  const [paymentMemberData, setPaymentMemberData] =
    useRecoilState(paymentMemberAtom);
  const [memberData, setMemberData] = useRecoilState(memberDataAtom);
  const [newOrderId, setNewOrderId] = useRecoilState(orderIdAtom);
  const [isSearch, setIsSearch] = useState(true);
  const [searchResult, setSearchResult] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const { state } = useLocation();
  const navigate = useNavigate();
  const userId = sessionStorage.getItem("userId");
  const accessToken = getCookie();
  const { id } = useParams();

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
        setMemberData(prev => ({
          ...prev,
          orderId: parseInt(id),
          data: [
            { userId: result.userId, point: 0 },
            ...prev.data.filter(m => m.userId !== result.userId),
          ],
        }));

        setPaymentMemberData(prev => {
          const members = prev || [];
          const isSelected = members.some(m => m.userId === userData.userId);

          if (isSelected) return members;

          return [
            { userId: result.userId, name: result.name, uid: result.uid },
            ...members,
          ];
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

        const result = res.data.resultData.filter(
          item => item.userId !== userData.userId,
        );
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
      searchText: name,
    };

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

      const result = res.data.resultData.filter(
        data => data.userId !== userData.userId,
      );
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
    if (e.code === "Enter") {
      searchMember();
    }
  };

  const changeCheckHandler = member => {
    if (!member || !member.userId) return;

    setPaymentMemberData(prev => {
      const members = prev || [];
      const isSelected = members.some(m => m.userId === member.userId);

      let updatedMembers;
      if (isSelected) {
        updatedMembers = members.filter(m => m.userId !== member.userId);
      } else {
        updatedMembers = [
          ...members,
          { userId: member.userId, name: member.name, uid: member.uid },
        ];
      }

      // 로그인한 사용자를 0번 인덱스에 유지
      const loggedInUser = {
        userId: userData.userId,
        name: userData.name,
        uid: userData.uid,
      };
      return [
        loggedInUser,
        ...updatedMembers.filter(m => m.userId !== userData.userId),
      ];
    });

    setMemberData(prev => {
      const updatedMembers = prev.data.filter(m => m.userId !== member.userId);

      if (updatedMembers.length === prev.data.length) {
        return {
          ...prev,
          data: [{ userId: member.userId, point: 0 }, ...prev.data],
        };
      }

      return { ...prev, data: updatedMembers };
    });
  };

  const nextBtnHandler = () => {
    navigate(`/user/placetoorder/price/${id}`);
  };

  console.log("화면에 출력할 데이터 : ", paymentMemberData);
  console.log("서버에 보낼 데이터 : ", memberData);

  return (
    <div className="w-full h-dvh overflow-x-hidden overflow-y-scroll scrollbar-hide">
      <div className="flex w-full justify-between py-6 items-center border-b border-gray">
        <div
          onClick={() => navigate("/user")}
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
      <div className="flex w-full justify-end p-4">
        <div>총 {paymentMemberData?.length}명 선택 중</div>
      </div>
      <div className="w-full h-dvh ">
        <div className="flex w-full h-[6%] items-center px-6 border-b border-gray">
          <div className="flex w-[90%] items-center gap-4">
            <input type="checkbox" className="w-5 h-5" checked disabled />
            <label className="text-xl">
              {userData.name}({userData.uid})
            </label>
          </div>
          <span className="w-[20%] text-darkGray">본인</span>
        </div>

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
              onClick={() => {
                if (inputValue.trim()) searchMember(inputValue);
              }}
              className="flex w-[10%] text-2xl"
            />
          </div>
          <div className="flex flex-col w-full pb-20">
            {searchResult.length > 0 ? (
              searchResult.map(item => (
                <div
                  key={item.userId}
                  className="flex w-full h-14 items-center gap-4 px-6 py-2 border-b border-gray"
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
              ))
            ) : (
              <div className="flex justify-center items-center h-40 text-gray-500 text-lg">
                {inputValue}에 대한 검색 결과가 없습니다.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Seatmate;
