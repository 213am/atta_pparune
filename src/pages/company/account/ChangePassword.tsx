import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { getCookie } from "../../../components/cookie";

interface IFormDataType {
  newUpw: string;
  newUpwConfirm: string;
}

const changePwSchema = yup.object({
  newUpw: yup.string().required("비밀번호는 필수입력 항목입니다"),
  newUpwConfirm: yup
    .string()
    .oneOf([yup.ref("newUpw"), null], "비밀번호가 일치하지 않습니다")
    .required("비밀번호를 확인해주세요"),
});

const ChangePassword = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(changePwSchema),

    mode: "onSubmit",
  });

  const accessToken = getCookie();

  const onSubmitHandler = async (data: IFormDataType) => {
    console.log("비밀번호 변경하기", data);

    const payload = {
      newUpw: "",
    };

    try {
      const res = await axios.put("/api/admin/v3/upw", payload, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col w-1/2">
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <div className="flex flex-col">
          <div className="flex">
            <label htmlFor="">새 비밀번호</label>
            <input type="password" {...register("newUpw")} />
          </div>
          <span className="text-red">{errors.newUpw?.message}</span>
        </div>
        <div className="flex flex-col">
          <div className="flex">
            <label htmlFor="">비밀번호 확인</label>
            <input type="password" {...register("newUpwConfirm")} />
          </div>
          <span className="text-red">{errors.newUpwConfirm?.message}</span>
        </div>
        <button type="submit">변경하기</button>
      </form>
    </div>
  );
};

export default ChangePassword;
