import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate, useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
import * as yup from "yup";
import Loading from "../../components/Loading";
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
} from "./loginStyle";

const SignUpSchema = yup.object({
  adminId: yup.number(),
  aid: yup
    .string()
    .min(6, "최소 6자 이상 작성해야 합니다.")
    .max(12, "최대 12자까지 작성 가능합니다."),
  apw: yup
    .string()
    .required("비밀번호는 필수입니다.")
    .min(8, "최소 8자 이상 작성해야 합니다.")
    .max(16, "최대 16자까지 작성 가능합니다.")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/,
      "비밀번호는 영어, 숫자, 특수문자만 가능합니다.",
    ),
  name: yup
    .string()
    .required("이름은 필수입니다.")
    .min(2, "이름은 최소 2자 이상이어야 합니다."),
  phone: yup
    .string()
    .required("전화번호는 필수입니다.")
    .matches(
      /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/,
      "전화번호 형식이 올바르지 않습니다.",
    ),
});

function SignUpPage() {
  const navigate = useNavigate();
  const [isSubmit, setIsSubmit] = useState(false);
  const [searchParams] = useSearchParams();
  const adminId = searchParams.get("adminId");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue, // setValue를 사용하여 폼 값을 설정합니다.
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(SignUpSchema),
    defaultValues: {
      phone: "",
    },
  });

  const idVal = watch("aid");
  const pwVal = watch("apw");
  const nameVal = watch("name");
  const phoneVal = watch("phone");
  const adminVal = watch("adminId");
  const hasVal = idVal && pwVal && nameVal && adminVal && phoneVal;

  const putSignUp = async data => {
    try {
      await axios.put("/api/admin/v3", data);
      Swal.fire({
        title: "회원가입이 완료 되었습니다.",
        icon: "success",
        confirmButtonText: "확인",
        showConfirmButton: true, // ok 버튼 노출 여부
        allowOutsideClick: false, // 외부 영역 클릭 방지
      }).then(result => {
        if (result.isConfirmed) {
          navigate("/");
        }
      });
      console.log("보낸 데이터??", data);
    } catch (error) {
      Swal.fire({
        title: "회원가입에 실패 하였습니다.",
        icon: "error",
        confirmButtonText: "확인",
        showConfirmButton: true, // ok 버튼 노출 여부
        allowOutsideClick: false, // 외부 영역 클릭 방지
      }).then(result => {
        if (result.isConfirmed) {
          setIsSubmit(false);
        }
      });
      console.log(error);
    }
  };

  const handleSubmitForm = async data => {
    setIsSubmit(prev => !prev);
    // data.phone = data.phone.replace(/-/g, "");
    putSignUp(data);
    console.log(data);
  };

  useEffect(() => {
    setValue("adminId", adminId);
  }, []);

  // useEffect(() => {
  //   if (phoneVal.length === 11) {
  //     setValue("phone", phoneVal.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3"));
  //   }
  //   if (phoneVal.length === 13) {
  //     setValue(
  //       "phone",
  //       phoneVal.replace(/-/g, "").replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3"),
  //     );
  //   }
  //   console.log(phoneVal);
  // }, [phoneVal]);

  return (
    <div>
      <LayoutDiv style={{ position: "relative" }}>
        <HeaderDiv>
          <CloseDiv>
            <IoMdArrowBack
              style={{ width: "100%", height: "100%", cursor: "pointer" }}
              onClick={() => navigate(-1)}
            />
          </CloseDiv>
        </HeaderDiv>
        <FormDiv>
          <form onSubmit={handleSubmit(handleSubmitForm)}>
            <TitleDiv>회원가입</TitleDiv>
            <InputYupDiv>
              <SignUpInput
                type="text"
                placeholder="아이디"
                {...register("aid")}
              />
              <YupDiv>{errors.aid?.message}</YupDiv>
            </InputYupDiv>
            <InputYupDiv>
              <SignUpInput
                type="password"
                placeholder="비밀번호 (8-16자)"
                {...register("apw")}
              />
              <YupDiv>{errors.apw?.message}</YupDiv>
            </InputYupDiv>
            <InputYupDiv>
              <SignUpInput
                type="text"
                placeholder="이름"
                {...register("name")}
              />
              <YupDiv>{errors.name?.message}</YupDiv>
            </InputYupDiv>
            <InputYupDiv>
              <SignUpInput
                type="tel"
                placeholder="휴대전화번호"
                maxLength={11}
                {...register("phone")}
              />
              <YupDiv>{errors.phone?.message}</YupDiv>
            </InputYupDiv>

            <div style={{ marginLeft: 20, marginRight: 20 }}>
              <LoginBtn
                type="submit"
                style={{
                  backgroundColor: hasVal ? "#6F4CDB" : "#ddd",
                }}
                disabled={!hasVal}
              >
                가입하기
              </LoginBtn>
            </div>
          </form>
        </FormDiv>
      </LayoutDiv>
      {isSubmit && <Loading />}
    </div>
  );
}

export default SignUpPage;
