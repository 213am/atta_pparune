/* eslint-disable @typescript-eslint/no-explicit-any */
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { getCookie } from "../../../components/cookie";
import Swal from "sweetalert2";

interface IFormDataType {
  newUpw: string;
  newUpwConfirm: string;
}

const changePwSchema = yup.object({
  newUpw: yup.string().required("비밀번호는 필수입력 항목입니다"),
  newUpwConfirm: yup
    .string()
    .oneOf([yup.ref("newUpw")], "비밀번호가 일치하지 않습니다")
    .required("비밀번호를 확인해주세요"),
});

const ChangePassword = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(changePwSchema),

    mode: "onSubmit",
  });

  const accessToken = getCookie();

  const onSubmitHandler = async (data: IFormDataType) => {
    console.log("비밀번호 변경하기", data);

    const payload = {
      newUpw: data.newUpw,
    };

    try {
      const res = await axios.put("/api/admin/v3/upw", payload, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(res.data);
      Swal.fire({
        title: "변경 성공!",
        text: res.data.resultMsg,
        icon: "success",
        confirmButtonText: "확인",
        showConfirmButton: true,
        allowOutsideClick: false,
      }).then(() => {
        reset({
          newUpw: "",
          newUpwConfirm: "",
        });
      });
    } catch (error: any) {
      console.log(error);
      Swal.fire({
        title: "생성 중 오류 발생",
        text: error.response.data.resultMsg,
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
        onSubmit={handleSubmit(onSubmitHandler)}
        className="flex flex-col gap-10"
      >
        <span className="text-xl">비밀번호 변경</span>
        <div className="flex flex-col px-10">
          <div className="flex h-14">
            <label
              htmlFor="password"
              className="flex w-1/4 text-darkGray text-nowrap"
            >
              새 비밀번호
            </label>
            <div className="flex flex-col w-1/2">
              <input
                id="password"
                type="password"
                {...register("newUpw")}
                className="flex w-full px-2 mb-1 border-b border-darkGray"
                placeholder="새로운 비밀번호를 입력해주세요"
              />
              <span className="text-red">{errors.newUpw?.message}</span>
            </div>
          </div>
          <div className="flex h-14">
            <label
              htmlFor="passwordConfirm"
              className="flex w-1/4 text-darkGray text-nowrap"
            >
              비밀번호 확인
            </label>
            <div className="flex flex-col w-1/2">
              <input
                id="passwordConfirm"
                type="password"
                {...register("newUpwConfirm")}
                className="flex w-full px-2 mb-1 border-b border-darkGray"
                placeholder="비밀번호를 확인해주세요"
              />
              <span className="text-red">{errors.newUpwConfirm?.message}</span>
            </div>
          </div>
        </div>
        <div className="flex w-4/5 justify-center">
          <button
            type="submit"
            className="border px-4 py-1 rounded-md bg-white hover:bg-primary hover:text-white"
          >
            변경하기
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
