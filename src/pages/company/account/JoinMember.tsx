import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const signupSchema = yup.object({
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupSchema),
    // 유효성 검사 방식( 입력 진행중에 )
    mode: "onChange",
  });

  const formSubmitHandler = data => {
    console.log(data);
  };

  return (
    <div className="flex flex-col w-full h-full">
      <form
        onSubmit={handleSubmit(formSubmitHandler)}
        className="flex flex-col w-1/4 h-2/3 gap-10 p-5 border rounded-md"
      >
        <span>사원 계정 생성</span>
        <div className="flex flex-col w-full h-full justify-between">
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
          <button type="submit">생성하기</button>
        </div>
      </form>
    </div>
  );
};

export default JoinMember;
