import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import * as yup from "yup";
import { roleAtom } from "../../atoms/roleAtom";
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
import Swal from "sweetalert2";

const SignUpSchema = yup.object({
  roleId: yup.string(),
  id: yup
    .string()
    .min(6, "최소 6자 이상 작성해야 합니다.")
    .max(12, "최대 12자까지 작성 가능합니다."),
  // .matches(
  //   /^[A-Za-z][A-Za-z0-9_]{6,12}$/,
  //   "아이디는 숫자, 영문으로 작성 가능합니다.",
  // ),
  pw: yup
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
  email: yup
    .string()
    .required("이메일은 필수입니다.")
    .email("올바른 이메일 형식이 아닙니다."),
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
  const role = useRecoilValue(roleAtom);
  const [isSubmit, setIsSubmit] = useState(false);

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

  const idVal = watch("id");
  const pwVal = watch("pw");
  const nameVal = watch("name");
  const emailVal = watch("email");
  const phoneVal = watch("phone");
  const hasVal = idVal && pwVal && nameVal && emailVal && phoneVal;

  const postSignUp = async data => {
    try {
      // console.log("보낼 데이터", data);
      await axios.post("/api/admin/sign-up", data);
      Swal.fire({
        title: "회원가입이 완료 되었습니다.",
        icon: "success",
        confirmButtonText: "확인",
        showConfirmButton: true, // ok 버튼 노출 여부
        allowOutsideClick: false, // 외부 영역 클릭 방지
      }).then(result => {
        if (result.isConfirmed) {
          navigate("/auth/signup/emailauth");
        }
      });
      console.log("보낸 데이터??", data);
    } catch (error) {
      console.log("보낸 데이터??", data);
      console.log(error);
    }
  };

  const handleSubmitForm = async data => {
    console.log(data);
    setIsSubmit(prev => !prev);
    data.phone = data.phone.replace(/-/g, "");
    postSignUp(data);
  };

  useEffect(() => {
    if (phoneVal.length === 11) {
      setValue("phone", phoneVal.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3"));
    }
    if (phoneVal.length === 13) {
      setValue(
        "phone",
        phoneVal.replace(/-/g, "").replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3"),
      );
    }
    console.log(phoneVal);
  }, [phoneVal]);

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
            {/* roleId를 보내기 위한 input */}
            <input
              type="text"
              value={role}
              style={{ display: "none" }}
              {...register("roleId")}
            />
            <TitleDiv>회원가입</TitleDiv>
            <InputYupDiv>
              <SignUpInput
                type="text"
                placeholder="아이디"
                {...register("id")}
              />
              <YupDiv>{errors.id?.message}</YupDiv>
            </InputYupDiv>
            <InputYupDiv>
              <SignUpInput
                type="password"
                placeholder="비밀번호 (8-16자)"
                {...register("pw")}
              />
              <YupDiv>{errors.pw?.message}</YupDiv>
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
                type="email"
                placeholder="이메일"
                {...register("email")}
              />
              <YupDiv>{errors.email?.message}</YupDiv>
            </InputYupDiv>
            <InputYupDiv>
              <SignUpInput
                type="tel"
                placeholder="휴대전화번호"
                maxLength={13}
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
