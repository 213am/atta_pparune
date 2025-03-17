import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { getCookie } from "../../../components/cookie";

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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col w-full h-full">
      <form
        onSubmit={handleSubmit(formSubmitHandler)}
        className="flex flex-col w-1/3 h-2/3 gap-10 p-5 border rounded-md tb:w-1/4"
      >
        <span>사원 계정 생성</span>
        <div className="flex flex-col w-full h-full justify-between">
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
          <div className="w-full h-1/5">
            <div className="flex items-center pb-1">
              <label htmlFor="name" className="flex w-[30%]">
                이름
              </label>
              <input
                id="name"
                className="flex w-[70%] px-2 border"
                {...register("name")}
              />
            </div>
            <p className="text-red">{errors.name?.message}</p>
          </div>
          <div className="w-full h-1/5">
            <div className="flex items-center pb-1">
              <label htmlFor="employeeNum" className="flex w-[30%]">
                사원번호
              </label>
              <input
                id="employeeNum"
                className="flex w-[70%] px-2 border"
                {...register("employeeNum")}
              />
            </div>
            <p className="text-red">{errors.employeeNum?.message}</p>
          </div>
          <div className="w-full h-1/5">
            <div className="flex items-center pb-1">
              <label htmlFor="upw" className="flex w-[30%]">
                비밀번호
              </label>
              <input
                type="password"
                id="upw"
                className="flex w-[70%] px-2 border"
                {...register("upw")}
              />
            </div>
            <p className="text-red">{errors.upw?.message}</p>
          </div>
          <div className="w-full h-1/5">
            <div className="flex items-center pb-1">
              <label htmlFor="email" className="flex w-[30%]">
                이메일
              </label>
              <input
                id="email"
                className="flex w-[70%] px-2 border"
                {...register("email")}
              />
            </div>
            <p className="text-red">{errors.email?.message}</p>
          </div>
          <div className="w-full h-1/5">
            <div className="flex items-center pb-1">
              <label htmlFor="phone" className="flex w-[30%]">
                핸드폰 번호
              </label>
              <input
                id="phone"
                className="flex w-[70%] px-2 border"
                {...register("phone")}
              />
            </div>
            <p className="text-red">{errors.phone?.message}</p>
          </div>
        </div>
        <div className="flex w-full justify-center">
          <button
            type="submit"
            className="px-4 py-1.5 border rounded-sm bg-white tracking-wide hover:bg-primary hover:text-white"
          >
            생성하기
          </button>
        </div>
      </form>
    </div>
  );
};

export default JoinMember;
