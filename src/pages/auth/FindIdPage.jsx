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

const loginSchema = yup.object({
  name: yup
    .string()
    .required("이름은 필수입니다.")
    .min(2, "이름은 최소 2자 이상이어야 합니다."),
  email: yup
    .string()
    .required("이메일은 필수입니다.")
    .email("올바른 이메일 형식이 아닙니다."),
});

function FindIdPage() {
  const navigate = useNavigate();
  const [isSubmit, setIsSubmit] = useState(false);
  const role = useRecoilValue(roleAtom);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(loginSchema),
  });

  const getId = async data => {
    try {
      if (role === USER) {
        await axios.get(
          `/api/user/find-id?name=${data.name}&email=${data.email}`,
        );
      } else if (role === STORE) {
        await axios.get(
          `/api/admin/find-id?name=${data.name}&email=${data.email}`,
        );
      }
      Swal.fire({
        title: `${data.email} 이메일로 아이디가 전송되었습니다.`,
        icon: "success",
        confirmButtonText: "확인",
        showConfirmButton: true, // ok 버튼 노출 여부
        allowOutsideClick: false, // 외부 영역 클릭 방지
      }).then(result => {
        if (result.isConfirmed) {
          navigate("/auth");
        }
      });
    } catch (error) {
      Swal.fire({
        title: "이름과 이메일이 일치하지 않습니다.",
        icon: "error",
        confirmButtonText: "확인",
        showConfirmButton: true, // ok 버튼 노출 여부
        allowOutsideClick: false, // 외부 영역 클릭 방지
      });
      setValue("name", "");
      setValue("email", "");
      setIsSubmit(false);
      console.log(error);
    }
  };

  const handleSubmitForm = data => {
    console.log(data);
    setIsSubmit(prev => !prev);
    getId(data);
  };

  const nameVal = watch("name");
  const emailVal = watch("email");
  const hasVal = nameVal && emailVal;

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
        <TitleDiv>아이디 찾기</TitleDiv>
        <FormDiv>
          <form onSubmit={handleSubmit(handleSubmitForm)}>
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

export default FindIdPage;
