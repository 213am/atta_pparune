import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import Swal from "sweetalert2";
import { roleAtom } from "../../../atoms/roleAtom";
import { setCookie } from "../../../components/cookie";
import { MANAGER, USER } from "../../../constants/Role";
import {
  CloseDiv,
  FormDiv,
  HeaderDiv,
  InputYupDiv,
  LayoutDiv,
  LoginBtn,
  LogoImg,
  SignUpInput,
  TitleDiv,
} from "../../auth/loginStyle";

function ServiceLoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ id: "", pw: "" });
  const [hasVal, setHasVal] = useState(false);
  const sessionUserId = sessionStorage.getItem("userId");
  const sessionAdminId = sessionStorage.getItem("adminId");

  const { handleSubmit } = useForm();

  const role = useRecoilValue(roleAtom);

  const routeHandler = () => {
    navigate(-1);
  };

  // 로그인
  const postLogin = async () => {
    try {
      if (role === USER) {
        const res = await axios.post("/api/user/sign-in", formData);

        const result = res.data.resultData;
        console.log(result);
        const userId = result.userId || sessionUserId;
        sessionStorage.setItem("id", userId);
        sessionStorage.setItem("name", result.name);
        sessionStorage.setItem("roleCode", result.code);
        setCookie(result.accessToken);
      } else if (role === MANAGER) {
        const res = await axios.post("/api/admin/sign-in", formData);
        const result = res.data.resultData;
        console.log(result);
        const adminId = result.adminId || sessionAdminId;
        sessionStorage.setItem("id", adminId);
        sessionStorage.setItem("name", result.name);
        sessionStorage.setItem("roleCode", result.code);
        setCookie(result.accessToken);
      }
      routeHandler();
    } catch (error) {
      Swal.fire({
        title: "아이디와 비밀번호가 일치하지 않습니다.",
        icon: "error",
        confirmButtonText: "확인",
        showConfirmButton: true, // ok 버튼 노출 여부
        allowOutsideClick: false, // 외부 영역 클릭 방지
      });
      console.log(error);
    }
  };

  const handleSubmitForm = () => {
    postLogin();
  };

  useEffect(() => {
    if (formData.id && formData.pw) {
      setHasVal(true);
    } else {
      setHasVal(false);
    }
  }, [formData]);

  return (
    <LayoutDiv>
      <HeaderDiv>
        <CloseDiv>
          <IoMdClose
            style={{ width: "100%", height: "100%", cursor: "pointer" }}
            onClick={() => navigate("/service")}
          />
        </CloseDiv>
      </HeaderDiv>
      <TitleDiv>
        <LogoImg src="/logo.png" alt="로고" />
      </TitleDiv>
      <FormDiv>
        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <InputYupDiv>
            <SignUpInput
              type="text"
              placeholder="아이디"
              value={formData.id}
              onChange={e => setFormData({ ...formData, id: e.target.value })}
            />
          </InputYupDiv>
          <InputYupDiv>
            <SignUpInput
              type="password"
              value={formData.pw}
              placeholder="비밀번호 (8-16자)"
              onChange={e => setFormData({ ...formData, pw: e.target.value })}
            />
          </InputYupDiv>
          <div style={{ marginLeft: 20, marginRight: 20 }}>
            <LoginBtn
              type="submit"
              style={{
                backgroundColor: hasVal ? "#6F4CDB" : "#ddd",
              }}
              disabled={!hasVal}
            >
              로그인
            </LoginBtn>
          </div>
        </form>
      </FormDiv>
    </LayoutDiv>
  );
}

export default ServiceLoginPage;
