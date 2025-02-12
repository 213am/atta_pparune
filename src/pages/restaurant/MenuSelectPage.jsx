import styled from "@emotion/styled";
import axios from "axios";
import { useEffect, useState } from "react";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FaAngleDown, FaAngleUp, FaCheck, FaPlus } from "react-icons/fa6";
import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";
import { IoMdArrowBack } from "react-icons/io";
import { LuMapPin } from "react-icons/lu";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { orderIdAtom, reserveState } from "../../atoms/restaurantAtom";
import dayjs from "dayjs";
import { userDataAtom } from "../../atoms/userAtom";
import { getCookie } from "../../components/cookie";
import { subscribeToReservationStatus } from "../../components/notification/StompComponent";
import Swal from "sweetalert2";

const BackDiv = styled.div`
  background-color: #fff;
  width: 24px;
  height: 24px;
  border-radius: 12px;
  padding: 3px;
  cursor: pointer;
  position: absolute;
  top: 0;
  margin: 10px 20px;
  color: #333;
`;

const TitleDiv = styled.div`
  padding: 15px 25px;
  div {
    font-size: 10px;
    color: #bababa;
    margin-bottom: 5px;
  }
  span {
    color: #eee;
    padding: 0 5px;
  }
  h1 {
    margin-bottom: 5px;
  }
  h2 {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 10px;
  }
`;

const LineDiv = styled.div`
  height: 10px;
  background-color: #ddd;
`;

const ContentDiv = styled.div`
  overflow-y: auto;
  padding: 15px 25px;
  padding-bottom: 100px;
  div {
    color: #707070;
  }
  span {
    word-wrap: break-word;
    font-size: 12px;
    font-weight: 700;
  }
  h1 {
    font-weight: 700;
    margin-bottom: 20px;
  }
`;

const MenuDiv = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 10px;
  img {
    width: 75px;
    height: 75px;
    border-radius: 5px;
  }
`;

const FlexDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalDiv = styled.div`
  position: absolute;
  width: 100%;
  bottom: 0;
  background-color: #fff;
  padding: 10px 10px;
  border-radius: 5px 5px 0 0;
  box-shadow:
    rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
    rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
  transition: height 0.3s ease-in-out;
  button {
    padding: 5px 40px;
    font-size: 14px;
    background-color: #6f4cdb;
    color: #fff;
    border-radius: 5px;
  }
`;

const SelectDiv = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  margin: 0 30px;
  p {
    font-size: 14px;
  }
  div {
    font-size: 12px;
    color: #888888;
  }
  span {
  }
`;

function MenuSelectPage() {
  const navigate = useNavigate();
  const isReserve = useRecoilValue(reserveState);
  const location = useLocation();
  const { time, count } = location.state || {};

  const [formData, setFormData] = useState({});
  const [isClick, setIsClick] = useState(false);

  // get 받아온 메뉴 리스트
  const [menu, setMenu] = useState([]);

  // 화면에 띄울 메뉴 리스트 (추가된 메뉴)
  const [addMenu, setAddMenu] = useState([]);

  // 보낼 메뉴 리스트
  const [postMenuList, setPostMenuList] = useState([]);
  const [orderId, setOrderId] = useRecoilState(orderIdAtom);

  // 보낼 데이터
  const [postData, setPostData] = useState({});
  const userData = useRecoilValue(userDataAtom);

  const { id } = useParams();

  const getDetailStore = async () => {
    try {
      const res = await axios.get(`/api/restaurant?restaurantId=${id}`);
      const result = res.data.resultData;
      setFormData(res.data.resultData);
      setMenu(result.menuCateList);
      console.log(res.data.resultData);
    } catch (error) {
      console.log(error);
    }
  };

  const postReservation = async () => {
    const accessToken = getCookie();
    console.log(postData);

    try {
      if (isReserve) {
        const res = await axios.post("/api/reservation", postData, {
          headers: {
            Authorization: accessToken,
          },
        });
        console.log(res.data.resultData);
        setOrderId(res.data.resultData);
        subscribeToReservationStatus(res.data?.resultData);
      } else {
        const res = await axios.post("/api/order/with-detail", postData, {
          headers: {
            Authorization: accessToken,
          },
        });
        console.log(res.data.resultData);
        setOrderId(res.data.resultData);
        subscribeToReservationStatus(res.data?.resultData);
      }
      Swal.fire({
        title: `${time}에 예약이 완료 되었습니다.`,
        icon: "success",
        confirmButtonText: "확인",
        showConfirmButton: true, // ok 버튼 노출 여부
        allowOutsideClick: false, // 외부 영역 클릭 방지
      }).then(result => {
        if (result.isConfirmed) {
          navigate("/user");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const cateName = () => {
    switch (formData.categoryId) {
      case 1:
        return "한식";
      case 2:
        return "중식";
      case 3:
        return "일식";
      default:
        return "기타";
    }
  };

  const increaseCount = index => {
    // 출력할 메뉴 리스트
    const updatedMenu = [...addMenu];
    updatedMenu[index].menuCount += 1;
    setAddMenu(updatedMenu);

    // 보낼 메뉴 리스트
    const updatedMenuTwo = [...postMenuList];
    updatedMenuTwo[index].menuCount += 1;
    setPostMenuList(updatedMenuTwo);
  };

  const decreaseCount = index => {
    const updatedMenu = [...addMenu];
    if (updatedMenu[index].menuCount > 1) {
      updatedMenu[index].menuCount -= 1;
      setAddMenu(updatedMenu);
    }

    const updatedMenuTwo = [...postMenuList];
    if (updatedMenuTwo[index].menuCount > 1) {
      updatedMenuTwo[index].menuCount -= 1;
      setPostMenuList(updatedMenuTwo);
    }
  };

  useEffect(() => {
    getDetailStore();
    console.log(id);
  }, []);

  useEffect(() => {
    // console.log(isReserve);
    // console.log("시간 : ", time, "인원 : ", count);
    const sessionUserId = window.sessionStorage.getItem("userId");
    if (isReserve) {
      const today = dayjs(new Date()).format("YYYY-MM-DD");
      const reserveTime = `${today} ${time}`;
      console.log("현재 시간", reserveTime);
      console.log(postMenuList);
      setPostData({
        userId: parseInt(sessionUserId),
        restaurantId: parseInt(id),
        reservationTime: reserveTime,
        reservationPeopleCount: count,
        userPhone: userData.phone.replace(/-/g, ""),
        menuList: [...postMenuList],
      });
    } else {
      setPostData({
        userId: sessionUserId,
        restaurantId: parseInt(id),
        orderDetails: [...postMenuList],
      });
    }
  }, [postMenuList]);

  useEffect(() => {
    console.log("포스트 데이터", postData);
  }, [postData]);

  return (
    <div style={{ height: "100vh" }}>
      <img
        src={`http://112.222.157.156:5222/pic/restaurant/${formData.restaurantId}/${formData.restaurantPics?.filePath}`}
        alt="가게 이미지"
        style={{ width: "100%", height: 260, position: "relative" }}
      />
      <BackDiv>
        <IoMdArrowBack
          style={{ width: "100%", height: "100%" }}
          onClick={() => navigate(-1)}
        />
      </BackDiv>
      <TitleDiv>
        <div>
          {formData?.restaurantAddress?.match(/^(?:대구광역시|대구)\s*(.+)/)[1]}{" "}
          <span>I</span> {cateName()}
        </div>
        <h1>{formData.restaurantName}</h1>
        <div>{formData.restaurantDescription}</div>

        <h2>
          <LuMapPin />
          {formData.restaurantAddress}
        </h2>
        <h2 style={{ marginTop: 10 }}>
          <BsFillTelephoneFill />
          매장 연락처 : {formData.restaurantNumber}
        </h2>
      </TitleDiv>
      <LineDiv />
      <ContentDiv>
        <h1>메뉴 선택</h1>
        {menu.map((item, index) => (
          <div key={index}>
            {item.menuList.map(list => (
              <div key={list.menuId}>
                <MenuDiv>
                  <img
                    src={`http://112.222.157.156:5222/pic/menu/${list.menuId}/${list?.menuPic}`}
                    alt="메뉴 이미지"
                  />
                  <div onClick={() => console.log()}>
                    <div>{list.menuName}</div>
                    <span>{list.price.toLocaleString("ko-KR")}원</span>
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      right: 20,
                      cursor: "pointer",
                    }}
                  >
                    {addMenu.some(item => item.menuId === list.menuId) ? (
                      <FaCheck
                        onClick={() => {
                          setAddMenu(prev =>
                            prev.filter(item => item.menuId !== list.menuId),
                          );
                          setPostMenuList(prev =>
                            prev.filter(item => item.menuId !== list.menuId),
                          );
                          setIsClick(true);
                        }}
                      />
                    ) : (
                      <FaPlus
                        onClick={() => {
                          setAddMenu(prev => [
                            ...prev,
                            {
                              menuId: list.menuId,
                              menuName: list.menuName,
                              price: list.price,
                              menuCount: 1,
                            },
                          ]);
                          setPostMenuList(prev => [
                            ...prev,
                            {
                              menuId: list.menuId,
                              // price: list.price,
                              menuCount: 1,
                            },
                          ]);
                          setIsClick(true);
                        }}
                      />
                    )}
                  </div>
                </MenuDiv>
                <LineDiv
                  style={{
                    height: 1,
                    backgroundColor: "#eee",
                    marginBottom: 10,
                  }}
                />
              </div>
            ))}
          </div>
        ))}
      </ContentDiv>
      <ModalDiv>
        <FlexDiv>
          {isClick ? (
            <FaAngleDown
              style={{ color: "#6F6F6F", cursor: "pointer" }}
              onClick={() => setIsClick(false)}
            />
          ) : (
            <FaAngleUp
              style={{ color: "#6F6F6F", cursor: "pointer" }}
              onClick={() => setIsClick(true)}
            />
          )}
        </FlexDiv>
        {isClick && (
          <div>
            {addMenu.map((item, idx) => (
              <div key={idx}>
                <SelectDiv>
                  <p>{item.menuName}</p>
                  <div>{item.price.toLocaleString()}</div>
                </SelectDiv>
                <SelectDiv style={{ margin: "5px 30px" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 15,
                    }}
                  >
                    <p onClick={() => decreaseCount(idx)}>
                      <FiMinusCircle className="cursor-pointer" />
                    </p>
                    <p>{item.menuCount}</p>
                    <p onClick={() => increaseCount(idx)}>
                      <FiPlusCircle className="cursor-pointer" />
                    </p>
                  </div>
                  <div>
                    {(item.menuCount * item.price).toLocaleString("ko-KR")}원
                  </div>
                </SelectDiv>
              </div>
            ))}
            <LineDiv
              style={{
                height: 1,
                backgroundColor: "#eee",
                margin: "10px 0",
              }}
            />
            <SelectDiv style={{ marginBottom: 10 }}>
              <p>
                총 수량 {addMenu.reduce((acc, item) => acc + item.menuCount, 0)}
                개
              </p>
              <p>
                총{" "}
                {addMenu
                  .reduce((acc, item) => acc + item.menuCount * item.price, 0)
                  .toLocaleString("ko-KR")}
                원
              </p>
            </SelectDiv>
            <FlexDiv>
              <button onClick={() => postReservation()}>
                {isReserve ? "예약하기" : "결제하기"}
              </button>
            </FlexDiv>
          </div>
        )}
      </ModalDiv>
    </div>
  );
}
export default MenuSelectPage;
