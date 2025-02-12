import styled from "@emotion/styled";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useEffect, useState } from "react";
import DaumPostcodeEmbed from "react-daum-postcode";
import { useForm } from "react-hook-form";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import Loading from "../../components/Loading";
import useModal from "../../components/useModal";
import {
  CloseDiv,
  FormDiv,
  HeaderDiv,
  InputYupDiv,
  LayoutDiv,
  LoginBtn,
  SignUpInput,
  TitleDiv,
  YupDiv,
} from "../auth/loginStyle";
import { FaCheck } from "react-icons/fa6";
import Swal from "sweetalert2";

const SignBtn = styled.button`
  color: #fff;
  border-radius: 5px;
  width: 120px;

  @media (max-width: 430px) {
    font-size: 14px;
    max-width: 80px;
    width: 100%;
    padding: 10px 0;
  }
  @media (max-width: 1400px) and (min-width: 431px) {
    width: 120px;
    padding: 15px 0;
    font-size: 20px;
  }
`;

const EmailInput = styled.input`
  border-bottom: 1px solid #bababa;
  color: #bababa;
  @media (max-width: 430px) {
    margin-right: 20px;
    max-width: 220px;
    width: 100%;
    padding: 10px 0;
  }
  @media (max-width: 1400px) and (min-width: 431px) {
    margin-right: 30px;
    width: 350px;
    font-size: 24px;
    padding: 15px 0;
  }
`;
const CateDiv = styled.div`
  padding: 10px 30px;
  border-radius: 30px;
  background-color: #6f4cdb;
  background-color: #ddd;
  color: #fff;
  cursor: pointer;
`;

const TimeDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  span {
    padding: 10px 25px;
    font-weight: 700;
    color: #6f4cdb;
  }
  input {
    font-size: 16px;
    background-color: none;
    width: 120px;
    height: 40px;
  }
`;

const storeSchema = yup.object({
  adminId: yup.number(),
  restaurantName: yup
    .string()
    .required("가게이름은 필수입니다.")
    .min(2, "가게이름은 최소 2자 이상이어야 합니다."),
  restaurantAddress: yup.string(),
  businessNumber: yup.string(),
  restaurantNumber: yup
    .string()
    .required("전화번호는 필수입니다.")
    .matches(/^\d{10,12}$/, "하이픈을 빼고 10~12자리 숫자만 입력해주세요."),
  categoryId: yup.number(),
  operatingHours: yup.string(),
  restaurantDescription: yup.string().required("상세 설명은 필수입니다."),
  maxCapacity: yup.number().min(1, "가게 규모는 1 이상이어야 합니다."),
  lat: yup.number(),
  lng: yup.number(),
});

function AddStorePage() {
  const navigate = useNavigate();
  const [isSubmit, setIsSubmit] = useState(false);
  const [inputAddress, setInputAddress] = useState({});
  const [operTime, setOperTime] = useState({
    startTime: "10:00",
    endTime: "22:00",
  });

  // 사업자 진위 여부 확인되면 true
  const [isCheck, setIsCheck] = useState(false);

  // 사업자 등록 번호 에러메세지 표시 안하다가 버튼 클릭되면 표시
  const [isClick, setIsClick] = useState(false);

  const { Modal, open, close } = useModal({ title: "주소검색" });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    mode: "all",
    resolver: yupResolver(storeSchema),
  });

  // 가게 등록 post
  const postStore = async data => {
    try {
      await axios.post("/api/restaurant", data);
      Swal.fire({
        title: "가게 등록이 완료 되었습니다.",
        icon: "success",
        confirmButtonText: "확인",
        showConfirmButton: true, // ok 버튼 노출 여부
        allowOutsideClick: false, // 외부 영역 클릭 방지
      }).then(result => {
        if (result.isConfirmed) {
          navigate("/store");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitForm = data => {
    if (isCheck) {
      console.log(data);
      setIsSubmit(prev => !prev);
      postStore(data);
    } else {
      Swal.fire({
        title: "사업자 진위여부를 확인해주세요.",
        icon: "error",
        confirmButtonText: "확인",
        showConfirmButton: true, // ok 버튼 노출 여부
        allowOutsideClick: false, // 외부 영역 클릭 방지
      });
    }
  };

  const idVal = watch("adminId");
  const nameVal = watch("restaurantName");
  const addressVal = watch("restaurantAddress");
  const bnoVal = watch("businessNumber");
  const rnoVal = watch("restaurantNumber");
  const cateId = watch("categoryId");
  const operHour = watch("operatingHours");
  const description = watch("restaurantDescription");
  const maxCapa = watch("maxCapacity");
  const lat = watch("lat");
  const lng = watch("lng");

  // 모두 입력됐을 때  true
  const hasVal =
    idVal &&
    nameVal &&
    addressVal &&
    bnoVal &&
    rnoVal &&
    cateId &&
    operHour &&
    description &&
    maxCapa &&
    lat &&
    lng;

  // 사업자 번호 진위여부 확인
  const postBno = async () => {
    setIsClick(true);
    try {
      const res = await axios.post(`/api/user/company/status?bNo=${bnoVal}`);
      const result = res.data.resultData;
      if (result.bstt === "계속사업자") {
        setIsCheck(true);
      } else if (result.bstt === "신규사업자") {
        setIsCheck(true);
      } else {
        setIsCheck(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // 주소를 위도, 경도로 변환
  const getCoordinates = async address => {
    try {
      const response = await fetch(
        `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(address)}`,
        {
          headers: {
            Authorization: `KakaoAK ${import.meta.env.VITE_KKO_MAP_REST_KEY}`,
          },
        },
      );
      const data = await response.json();
      if (data.documents.length > 0) {
        const { x: longitude, y: latitude } = data.documents[0];
        // 위도, 경도 저장
        setValue("lat", latitude);
        setValue("lng", longitude);
        console.log("이 주소의 위도 : ", latitude, ", 경도 : ", longitude);
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
    }
  };

  // 다음 포스트
  const addressHandler = async data => {
    console.log(data);
    let fullAddress = data.address;
    let extraAddress = "";
    const zoneCode = data.zonecode;
    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    await getCoordinates(fullAddress);
    // setIsClick(false);
    close();
    setInputAddress({ fullAddress: fullAddress, zoneCode: zoneCode });
    // console.log(fullAddress);
    setValue("restaurantAddress", fullAddress);
  };

  useEffect(() => {
    setValue("operatingHours", `${operTime.startTime} ~ ${operTime.endTime}`);
    console.log("운영시간 ", watch("operatingHours"));
  }, [operTime]);

  const adminId = sessionStorage.getItem("adminId");

  useEffect(() => {
    setValue("adminId", adminId);
    setValue("categoryId", 1);
  }, []);

  useEffect(() => {
    console.log(addressVal);
    console.log("이 주소의 위도 : ", lat);
    console.log("이 주소의 경도 : ", lng);
  }, [addressVal]);

  return (
    <div>
      <LayoutDiv style={{ position: "relative" }}>
        <HeaderDiv>
          <CloseDiv>
            <IoMdArrowBack
              style={{ width: "100%", height: "100%", cursor: "pointer" }}
              onClick={() => navigate("/")}
            />
          </CloseDiv>
        </HeaderDiv>
        <FormDiv>
          <form onSubmit={handleSubmit(handleSubmitForm)}>
            {/* adminId 보낼 input */}
            <input
              type="tel"
              style={{ position: "absolute", left: "-5000px" }}
              {...register("adminId")}
            />

            {/* 위도, 경도 보낼 input */}
            <input
              type="tel"
              {...register("lat")}
              style={{ position: "absolute", left: "-5000px" }}
            />
            <input
              type="tel"
              {...register("lng")}
              style={{ position: "absolute", left: "-5000px" }}
            />

            <TitleDiv>온라인 입점신청서</TitleDiv>
            <InputYupDiv>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: 20,
                  width: 500,
                }}
              >
                <EmailInput
                  type="text"
                  placeholder="사업자등록번호"
                  {...register("businessNumber")}
                />
                <SignBtn
                  type="button"
                  style={{
                    backgroundColor: bnoVal ? "#6F4CDB" : "#ddd",
                  }}
                  disabled={!bnoVal}
                  onClick={() => {
                    postBno();
                  }}
                >
                  번호조회
                </SignBtn>
              </div>
              {isClick ? (
                isCheck ? (
                  <YupDiv style={{ color: "#888" }}>
                    <FaCheck />
                    입점신청 가능한 사업자번호입니다.
                  </YupDiv>
                ) : (
                  <YupDiv style={{ color: "red" }}>
                    사업자 번호를 확인해 주세요.
                  </YupDiv>
                )
              ) : (
                <></>
              )}
            </InputYupDiv>
            <InputYupDiv>
              <SignUpInput
                type="text"
                placeholder="가게 이름"
                {...register("restaurantName")}
              />
              <YupDiv>{errors.restaurantName?.message}</YupDiv>
            </InputYupDiv>
            <InputYupDiv>
              <SignUpInput
                type="tel"
                maxLength={12}
                placeholder="가게 전화번호"
                {...register("restaurantNumber")}
              />
              <YupDiv>{errors.restaurantNumber?.message}</YupDiv>
            </InputYupDiv>

            <InputYupDiv>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: 20,
                  width: 500,
                }}
              >
                <EmailInput
                  type="text"
                  placeholder="가게 주소"
                  value={inputAddress ? inputAddress.fullAddress : ""}
                  onClick={() => open()}
                  {...register("restaurantAddress")}
                />
                <SignBtn
                  type="button"
                  style={{
                    backgroundColor: "#6F4CDB",
                  }}
                  onClick={() => open()}
                >
                  주소찾기
                </SignBtn>
              </div>
              <YupDiv>{errors.restaurantAddress?.message}</YupDiv>
            </InputYupDiv>
            <InputYupDiv>
              <SignUpInput
                type="text"
                placeholder="가게 상세설명"
                {...register("restaurantDescription")}
              />
              <YupDiv>{errors.restaurantDescription?.message}</YupDiv>
            </InputYupDiv>
            <InputYupDiv>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: 500,
                  fontSize: 24,
                }}
              >
                <div style={{ fontSize: 24 }}>가게 규모 : </div>
                <EmailInput
                  type="number"
                  placeholder="0"
                  style={{ width: 300, textAlign: "right", paddingRight: 20 }}
                  {...register("maxCapacity", {
                    setValueAs: value => (value === "" ? 0 : value),
                  })}
                />
                <div>명</div>
              </div>
              <YupDiv>{errors.maxCapacity?.message}</YupDiv>
            </InputYupDiv>
            <InputYupDiv>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 20,
                  width: 500,
                }}
              >
                <div style={{ fontSize: 24 }}>카테고리 선택</div>
                <div style={{ display: "flex", gap: 20 }}>
                  <CateDiv
                    onClick={() => setValue("categoryId", 1)}
                    style={{ backgroundColor: cateId === 1 && "#6F4CDB" }}
                  >
                    한식
                  </CateDiv>
                  <CateDiv
                    onClick={() => setValue("categoryId", 2)}
                    style={{ backgroundColor: cateId === 2 && "#6F4CDB" }}
                  >
                    중식
                  </CateDiv>
                  <CateDiv
                    onClick={() => setValue("categoryId", 3)}
                    style={{ backgroundColor: cateId === 3 && "#6F4CDB" }}
                  >
                    일식
                  </CateDiv>
                </div>
              </div>
            </InputYupDiv>
            <InputYupDiv>
              <div style={{ fontSize: 24, textAlign: "left" }}>운영시간</div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 20,
                  width: 500,
                }}
              >
                <TimeDiv>
                  <span>오픈시간</span>
                  <input
                    type="time"
                    value={operTime.startTime}
                    onChange={e =>
                      setOperTime(prev => ({
                        ...prev,
                        startTime: e.target.value,
                      }))
                    }
                  />
                </TimeDiv>
                <TimeDiv>
                  <span>마감시간</span>
                  <input
                    type="time"
                    value={operTime.endTime}
                    onChange={e =>
                      setOperTime(prev => ({
                        ...prev,
                        endTime: e.target.value,
                      }))
                    }
                  />
                </TimeDiv>
              </div>
            </InputYupDiv>
            <div style={{ marginLeft: 20, marginRight: 20, marginTop: 40 }}>
              <LoginBtn
                type="submit"
                style={{
                  backgroundColor: hasVal ? "#6F4CDB" : "#ddd",
                }}
                disabled={!hasVal}
              >
                확인
              </LoginBtn>
            </div>
          </form>
        </FormDiv>
      </LayoutDiv>
      {open ? (
        <Modal>
          {/* <div className="absolute w-[50%] border"> */}
          <DaumPostcodeEmbed onComplete={e => addressHandler(e)} />
          {/* </div> */}
        </Modal>
      ) : (
        <></>
      )}
      {isSubmit && <Loading />}
    </div>
  );
}

export default AddStorePage;
