import styled from "@emotion/styled";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useState } from "react";
import DaumPostcodeEmbed from "react-daum-postcode";
import { useForm } from "react-hook-form";
import { FaCheck } from "react-icons/fa6";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
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

const SignBtn = styled.button`
  color: #fff;
  border-radius: 5px;
  width: 120px;
  padding: 15px 0;
  font-size: 20px;

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
  margin-right: 30px;
  width: 350px;
  font-size: 24px;
  padding: 15px 0;
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

const storeSchema = yup.object({
  name: yup
    .string()
    .required("회사이름은 필수입니다.")
    .min(2, "회사이름은 최소 2자 이상이어야 합니다."),
  email: yup
    .string()
    .required("이메일은 필수입니다.")
    .email("올바른 이메일 형식이 아닙니다."),
  address: yup.string(),
  businessNumber: yup.string(),
  ceoName: yup
    .string()
    .required("대표자이름은 필수입니다.")
    .min(2, "대표자이름은 최소 2자 이상이어야 합니다."),
});

function AddCompanyPage() {
  const navigate = useNavigate();
  const [isSubmit, setIsSubmit] = useState(false);
  const [inputAddress, setInputAddress] = useState({});

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

  const nameVal = watch("name");
  const emailVal = watch("email");
  const addressVal = watch("address");
  const bnoVal = watch("businessNumber");
  const ceoVal = watch("ceoName");

  // 모두 입력됐을 때  true
  const hasVal = nameVal && emailVal && addressVal && bnoVal && ceoVal;

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
    close();
    setInputAddress({ fullAddress: fullAddress, zoneCode: zoneCode });
    setValue("address", fullAddress);
  };

  return (
    <div className="bg-white h-[100vh] overflow-y-auto scrollbar-hide">
      <LayoutDiv style={{ position: "relative" }}>
        <HeaderDiv>
          <CloseDiv>
            <IoMdArrowBack
              className="w-full h-full cursor-pointer"
              onClick={() => navigate(-1)}
            />
          </CloseDiv>
        </HeaderDiv>
        <FormDiv>
          <form onSubmit={handleSubmit(handleSubmitForm)}>
            <TitleDiv>기업 제휴 신청서</TitleDiv>
            <InputYupDiv>
              <div className="flex justify-between items-center w-[500px]">
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
                placeholder="회사 이름"
                {...register("name")}
              />
              <YupDiv>{errors.name?.message}</YupDiv>
            </InputYupDiv>
            <InputYupDiv>
              <div className="flex justify-between items-center w-[500px]">
                <EmailInput
                  type="text"
                  placeholder="회사 주소"
                  value={inputAddress ? inputAddress.fullAddress : ""}
                  onClick={() => open()}
                  {...register("address")}
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
              <YupDiv>{errors.address?.message}</YupDiv>
            </InputYupDiv>
            <InputYupDiv>
              <SignUpInput
                type="text"
                placeholder="대표자 이름"
                {...register("ceoName")}
              />
              <YupDiv>{errors.ceoName?.message}</YupDiv>
            </InputYupDiv>
            <InputYupDiv>
              <SignUpInput
                type="email"
                placeholder="이메일"
                {...register("email")}
              />
              <YupDiv>{errors.email?.message}</YupDiv>
            </InputYupDiv>

            <div className="mx-[20px]">
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
          <DaumPostcodeEmbed onComplete={e => addressHandler(e)} />
        </Modal>
      ) : (
        <></>
      )}
      {isSubmit && <Loading />}
    </div>
  );
}

export default AddCompanyPage;
