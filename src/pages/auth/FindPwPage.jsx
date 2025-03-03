import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
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
import { useRecoilValue } from "recoil";
import { roleAtom } from "../../atoms/roleAtom";
import { STORE, USER } from "../../constants/Role";
import Swal from "sweetalert2";

const findPwSchema = yup.object({
  id: yup
    .string()
    .min(6, "최소 6자 이상 작성해야 합니다.")
    .max(12, "최대 12자까지 작성 가능합니다."),
  // .matches(
  //   /^[A-Za-z][A-Za-z0-9_]{6,12}$/,
  //   "아이디는 숫자, 영문으로 작성 가능합니다.",
  // ),
  email: yup
    .string()
    .required("이메일은 필수입니다.")
    .email("올바른 이메일 형식이 아닙니다."),
});

function FindPwPage() {
  const navigate = useNavigate();
  const [isSubmit, setIsSubmit] = useState(false);
  const role = useRecoilValue(roleAtom);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(findPwSchema),
  });

  // api 완성되면 작업
  const findPw = async data => {
    try {
      if (role === USER) {
        await axios.put("/api/user/find-passowrd", data);
        Swal.fire({
          title: `${data.email}로 비밀번호가 전송되었습니다.`,
          icon: "success",
          confirmButtonText: "확인",
          showConfirmButton: true, // ok 버튼 노출 여부
          allowOutsideClick: false, // 외부 영역 클릭 방지
        }).then(result => {
          if (result.isConfirmed) {
            navigate("/auth");
          }
        });
      } else if (role === STORE) {
        await axios.put("/api/admin/find-passowrd", data);
        Swal.fire({
          title: `${data.email}로 비밀번호가 전송되었습니다.`,
          icon: "success",
          confirmButtonText: "확인",
          showConfirmButton: true, // ok 버튼 노출 여부
          allowOutsideClick: false, // 외부 영역 클릭 방지
        }).then(result => {
          if (result.isConfirmed) {
            navigate("/auth");
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitForm = data => {
    setIsSubmit(prev => !prev);
    findPw(data);
  };

  const idVal = watch("id");
  const emailVal = watch("email");
  const hasVal = idVal && emailVal;

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
            <TitleDiv>비밀번호 찾기</TitleDiv>
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
                type="email"
                placeholder="이메일"
                {...register("email")}
              />
              <YupDiv>{errors.email?.message}</YupDiv>
            </InputYupDiv>

            <div style={{ marginLeft: 20, marginRight: 20 }}>
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
      {isSubmit && <Loading />}
    </div>
  );
}

export default FindPwPage;
