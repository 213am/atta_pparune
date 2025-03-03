import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useEffect, useState } from "react";
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
import { getCookie } from "../../components/cookie";
import { useRecoilValue } from "recoil";
import { roleAtom } from "../../atoms/roleAtom";
import { STORE, USER } from "../../constants/Role";
import Swal from "sweetalert2";

const editPwSchema = yup.object({
  newUpw: yup
    .string()
    .required("비밀번호는 필수입니다.")
    .min(8, "최소 8자 이상 작성해야 합니다.")
    .max(16, "최대 16자까지 작성 가능합니다.")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/,
      "비밀번호는 영어, 숫자, 특수문자만 가능합니다.",
    ),
  pwConfirm: yup
    .string()
    .required("비밀번호 확인을 입력해주세요.")
    .oneOf([yup.ref("newUpw")], "비밀번호가 일치하지 않습니다."),
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
    resolver: yupResolver(editPwSchema),
  });

  // api 완성되면 작업
  const putPw = async data => {
    try {
      const accessToken = getCookie();
      console.log(accessToken);
      if (role === USER) {
        await axios.put("/api/user/upw", data, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        Swal.fire({
          title: "비밀번호가 변경 되었습니다.",
          icon: "success",
          confirmButtonText: "확인",
          showConfirmButton: true, // ok 버튼 노출 여부
          allowOutsideClick: false, // 외부 영역 클릭 방지
        }).then(result => {
          if (result.isConfirmed) {
            navigate("/user");
          }
        });
      } else if (role === STORE) {
        await axios.put("/api/admin/upw", data, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        Swal.fire({
          title: "비밀번호가 변경 되었습니다.",
          icon: "success",
          confirmButtonText: "확인",
          showConfirmButton: true, // ok 버튼 노출 여부
          allowOutsideClick: false, // 외부 영역 클릭 방지
        }).then(result => {
          if (result.isConfirmed) {
            navigate("/store");
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitForm = data => {
    setIsSubmit(prev => !prev);
    putPw({ newUpw: data.newUpw });
  };

  const pwVal = watch("newUpw");
  const pwConfirmVal = watch("pwConfirm");
  const hasVal = pwVal && pwConfirmVal;

  useEffect(() => {
    console.log(role);
  }, []);

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
            <TitleDiv>비밀번호 변경</TitleDiv>
            <InputYupDiv>
              <SignUpInput
                type="password"
                placeholder="새 비밀번호"
                {...register("newUpw")}
              />
              <YupDiv>{errors.newUpw?.message}</YupDiv>
            </InputYupDiv>
            <InputYupDiv>
              <SignUpInput
                type="password"
                placeholder="새 비밀번호 확인"
                {...register("pwConfirm")}
              />
              <YupDiv>{errors.pwConfirm?.message}</YupDiv>
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
