/* eslint-disable @typescript-eslint/no-explicit-any */
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { getCookie } from "../../../components/cookie";
import Swal from "sweetalert2";

interface IFormDataType {
  adminId: number;
  companyId: number;
  name: string;
  employeeNum: string;
  upw: string;
  email: string;
  phone: string;
}

const signupSchema = yup.object({
  adminId: yup.number().required(),
  companyId: yup.number().required(),
  name: yup.string().required("이름은 필수입력 항목입니다"),
  employeeNum: yup.string().required("사원번호는 필수입력 항목입니다"),
  upw: yup.string().required("비밀번호는 필수입력 항목입니다"),
  email: yup
    .string()
    .email("이메일 주소를 확인해주세요")
    .required("이메일 주소는 필수입력 항목입니다"),
  phone: yup.string().required("연락처는 필수입력 항목입니다"),
});

const JoinMember = (): JSX.Element => {
  const accessToken = getCookie();
  const adminId = sessionStorage.getItem("adminId") as string;
  const companyId = sessionStorage.getItem("companyId") as string;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(signupSchema),
    // 유효성 검사 방식( 입력 진행중에 )
    mode: "onChange",
  });

  const formSubmitHandler = async (data: IFormDataType) => {
    console.log("사원 계정 데이터 : ", data);
    const payload = { ...data };

    try {
      const res = await axios.post("/api/admin/company/v3/employee", payload, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log("사원 계정 생성요청 : ", res.data);
      if (res.data.statusCode === "200") {
        Swal.fire({
          title: "새로운 계정이 생성됐습니다!",
          icon: "success",
          confirmButtonText: "확인",
          showConfirmButton: true,
          allowOutsideClick: false,
        }).then(() => {
          reset({
            adminId: parseInt(adminId),
            companyId: parseInt(companyId),
            name: "",
            employeeNum: "",
            upw: "",
            email: "",
            phone: "",
          });
        });
      }
    } catch (error: any) {
      console.log(error);
      Swal.fire({
        title: "생성 중 오류 발생",
        text: "다시 한번 시도해주세요",
        icon: "error",
        confirmButtonText: "확인",
        showConfirmButton: true,
        allowOutsideClick: false,
      });
    }
  };

  return (
    <div className="flex flex-col w-full">
      <form
        onSubmit={handleSubmit(formSubmitHandler)}
        className="flex flex-col gap-10"
      >
        <span className="text-xl">사원 계정 생성</span>
        <div className="flex flex-col h-full gap-4 px-10">
          <input
            type="hidden"
            value={parseInt(adminId)}
            {...register("adminId")}
          />
          <input
            type="hidden"
            value={parseInt(companyId)}
            {...register("companyId")}
          />
          <div className="flex w-full h-14">
            <label
              htmlFor="name"
              className="flex w-[22%] text-darkGray pt-0.5 lg:w-[25%] tb:w-[20%]"
            >
              이름
            </label>
            <div className="flex flex-col w-2/5">
              <input
                id="name"
                className="flex w-full px-2 mb-1 border-b border-darkGray"
                placeholder="이름을 입력해주세요"
                {...register("name")}
              />
              <p className="text-red h-1/2">{errors.name?.message}</p>
            </div>
          </div>
          <div className="flex w-full h-14">
            <label
              htmlFor="employeeNum"
              className="flex w-[22%] text-darkGray pt-0.5 lg:w-[25%] tb:w-[20%]"
            >
              사원번호
            </label>
            <div className="flex flex-col w-2/5">
              <input
                id="employeeNum"
                className="flex w-full px-2 mb-1 border-b border-darkGray"
                placeholder="4자리 숫자를 입력해주세요"
                {...register("employeeNum")}
              />
              <p className="text-red h-1/2">{errors.employeeNum?.message}</p>
            </div>
          </div>
          <div className="flex w-full h-14">
            <label
              htmlFor="upw"
              className="flex w-[22%] text-darkGray pt-0.5 lg:w-[25%] tb:w-[20%]"
            >
              비밀번호
            </label>
            <div className="flex flex-col w-2/5">
              <input
                type="password"
                id="upw"
                className="flex w-full px-2 mb-1 border-b border-darkGray"
                placeholder="비밀번호를 입력해주세요"
                {...register("upw")}
              />
              <p className="text-red h-1/2">{errors.upw?.message}</p>
            </div>
          </div>
          <div className="w-full flex h-14">
            <label
              htmlFor="email"
              className="flex w-[22%] text-darkGray pt-0.5 lg:w-[25%] tb:w-[20%]"
            >
              이메일
            </label>
            <div className="flex flex-col w-2/5">
              <input
                id="email"
                className="flex w-full px-2 mb-1 border-b border-darkGray"
                placeholder="이메일 주소를 입력해주세요"
                {...register("email")}
              />
              <p className="text-red h-1/2">{errors.email?.message}</p>
            </div>
          </div>
          <div className="flex w-full h-14">
            <label
              htmlFor="phone"
              className="flex w-[22%] text-darkGray text-nowrap pt-0.5 lg:w-[25%] tb:w-[20%]"
            >
              핸드폰 번호
            </label>
            <div className="flex flex-col w-2/5">
              <input
                id="phone"
                className="flex w-full px-2 mb-1 border-b border-darkGray"
                placeholder="- 없이 숫자만 입력해주세요"
                {...register("phone")}
              />
              <p className="flex text-red w-full h-1/2">
                {errors.phone?.message}
              </p>
            </div>
          </div>
        </div>
        <div className="flex w-3/5 justify-center">
          <button
            type="submit"
            className="px-4 py-1.5 border rounded-md bg-white tracking-wide hover:bg-primary hover:text-white"
          >
            생성하기
          </button>
        </div>
      </form>
    </div>
  );
};

export default JoinMember;
