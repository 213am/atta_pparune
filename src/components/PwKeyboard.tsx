import axios from "axios";
import { useCallback, useState } from "react";
import { FaDeleteLeft } from "react-icons/fa6";
import { getCookie } from "./cookie";

const PwKeyboard = () => {
  const PASSWORD_MAX_LENGTH = 6;
  const nums_init = Array.from({ length: 10 }, (_, k) => k);
  const [nums, setNums] = useState(nums_init);
  const [password, setPassword] = useState("");
  const accessToken = getCookie();
  const adminId = sessionStorage.getItem("adminId") as string;
  const restaurantId = sessionStorage.getItem("restaurantId") as string;

  const handlePasswordChange = useCallback((num: number) => {
    setPassword(prev =>
      prev.length < PASSWORD_MAX_LENGTH ? prev + num.toString() : prev,
    );
  }, []);

  const erasePasswordOne = useCallback(() => {
    setPassword(prev => prev.slice(0, prev.length === 0 ? 0 : prev.length - 1));
  }, []);

  const erasePasswordAll = useCallback(() => {
    setPassword("");
  }, []);

  const shuffleNums = useCallback(
    (num: number) => () => {
      setNums(prev => [...prev.sort(() => Math.random() - 0.5)]);
      handlePasswordChange(num);
    },
    [handlePasswordChange],
  );

  const editPinHandler = async () => {
    const payload = {
      adminId: parseInt(adminId),
      restaurantId: parseInt(restaurantId),
      paymentPassword: password,
    };
    try {
      const res = await axios.patch(
        "/api/admin/restaurnat/v3/password",
        payload,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const onClickSubmitButton = () => {
    if (password.length === 0) {
      alert("비밀번호를 입력 후 눌러주세요!");
    } else {
      alert(password + "을 입력하셨습니다.");
      editPinHandler();
    }
  };

  return (
    <div className="flex flex-col w-full items-center p-4 justify-center">
      <div className="flex flex-col w-full items-center">
        <span className="flex text-lg">
          <strong className="text-primary pr-1 text-xl">ㅇㅇㅇ 님</strong> 의
        </span>
        <span className="flex text-2xl">결제 비밀번호를 입력해주세요</span>
      </div>
      <div className="flex space-x-2 my-4">
        {[...Array(PASSWORD_MAX_LENGTH)].map((_, i) => (
          <div
            key={i}
            className={`w-6 h-6 border rounded-full transition-all duration-300 ${i < password.length ? "bg-primary" : "bg-white"}`}
          ></div>
        ))}
      </div>
      <div className="flex flex-wrap w-96 h-80 justify-between items-center mt-6">
        {nums.map((n, i) => (
          <button
            key={i}
            className="w-1/3 h-1/4 border flex items-center justify-center text-2xl font-fantasy transition-all duration-300 ease-in-out hover:shadow-lg hover:text-white hover:bg-primaryFocus"
            onClick={shuffleNums(n)}
          >
            {n}
          </button>
        ))}
        <button
          className="w-1/3 h-1/4 border flex items-center justify-center text-lg font-fantasy transition-all duration-300 ease-in-out hover:shadow-lg hover:text-white hover:bg-red"
          onClick={erasePasswordAll}
        >
          전체삭제
        </button>
        <button
          className="w-1/3 h-1/4 border flex items-center justify-center text-2xl font-fantasy transition-all duration-300 ease-in-out hover:shadow-lg hover:text-white hover:bg-slate-600"
          onClick={erasePasswordOne}
        >
          <FaDeleteLeft />
        </button>
      </div>
      <button
        type="submit"
        className="mt-6 px-6 py-3 bg-darkGray text-white font-semibold rounded-lg transition-all duration-300 ease-in-out hover:bg-slate-600 hover:text-white hover:shadow-lg"
        onClick={onClickSubmitButton}
      >
        확인
      </button>
    </div>
  );
};

export default PwKeyboard;
