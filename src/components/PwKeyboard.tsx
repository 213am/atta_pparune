import axios from "axios";
import { useCallback, useState } from "react";
import { FaDeleteLeft } from "react-icons/fa6";
import { getCookie } from "./cookie";
import Swal from "sweetalert2";

interface PwKeyboardProps {
  close: () => void;
  mode?: "input" | "edit"; // mode가 가질 수 있는 값의 타입 지정
  onSubmit: (value: string) => void;
  enqCount: number[];
}

const PwKeyboard: React.FC<PwKeyboardProps> = ({
  close,
  mode = "input",
  onSubmit,
}) => {
  const PASSWORD_MAX_LENGTH = 6;
  const nums_init = Array.from({ length: 10 }, (_, k) => k);
  const [nums, setNums] = useState(nums_init);
  const [password, setPassword] = useState("");
  const [lastClickedIndex, setLastClickedIndex] = useState<number | null>(null);

  const accessToken = getCookie();
  const adminId = sessionStorage.getItem("adminId") as string;
  const restaurantId = sessionStorage.getItem("restaurantId") as string;

  const handlePasswordChange = useCallback((num: number) => {
    setPassword(prev =>
      prev.length < PASSWORD_MAX_LENGTH ? prev + num.toString() : prev,
    );
  }, []);

  const erasePasswordOne = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.currentTarget.blur();
      setPassword(prev =>
        prev.slice(0, prev.length === 0 ? 0 : prev.length - 1),
      );
    },
    [],
  );

  const erasePasswordAll = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.currentTarget.blur();
      setPassword("");
    },
    [],
  );

  const editPinHandler = async () => {
    const payload = {
      adminId: parseInt(adminId),
      restaurantId: parseInt(restaurantId),
      paymentPassword: password,
    };
    try {
      const res = await axios.patch(
        "/api/admin/restaurant/v3/password",
        payload,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      console.log(res.data);
      if (res.data.resultData === 1) {
        close();
        Swal.fire("비밀번호가 변경되었습니다!", "", "success");
      }
    } catch (error) {
      console.log(error);
      Swal.fire("비밀번호 변경 실패!", "다시 시도해주세요.", "error");
    }
  };

  const onClickSubmitButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.blur();
    if (password.length !== 6) {
      Swal.fire("변경 실패!", "비밀번호 6자리를 모두 입력해주세요!", "error");
      return;
    }

    if (mode === "edit") {
      editPinHandler(); // 비밀번호 변경 요청
    } else {
      onSubmit(password); // 부모 컴포넌트에서 전달받은 함수 실행
    }
  };

  const handleNumberClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>, num: number, index: number) => {
      e.currentTarget.blur();
      setLastClickedIndex(index); // 클릭된 버튼 인덱스 저장

      setNums(prev => {
        const array = [...prev];
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      });

      handlePasswordChange(num);
    },
    [handlePasswordChange],
  );

  return (
    <div className="flex flex-col w-full items-center px-10 justify-center">
      <div className="flex flex-col w-full items-center">
        <span className="flex text-2xl">
          {mode === "edit"
            ? "새 비밀번호를 입력하세요"
            : "결제 비밀번호를 입력해주세요"}
        </span>
      </div>
      <div className="flex space-x-2 my-4">
        {[...Array(PASSWORD_MAX_LENGTH)].map((_, i) => (
          <div
            key={i}
            className={`w-6 h-6 border rounded-full transition-all duration-300 ${
              i < password.length ? "bg-primary" : "bg-white"
            }`}
          ></div>
        ))}
      </div>
      <div className="flex flex-wrap w-96 h-80 justify-between items-center mt-6">
        {nums.map((n, i) => (
          <button
            key={i}
            aria-label={`숫자 ${n}`}
            className={`w-1/3 h-1/4 border flex items-center justify-center text-2xl font-fantasy transition-all duration-300 ease-in-out 
      ${lastClickedIndex !== i ? "hover:shadow-lg hover:text-white hover:bg-primaryFocus" : ""}`}
            onClick={e => handleNumberClick(e, n, i)}
          >
            {n}
          </button>
        ))}

        <button
          aria-label="비밀번호 전체 삭제"
          className="w-1/3 h-1/4 border flex items-center justify-center text-lg font-fantasy transition-all duration-300 ease-in-out hover:shadow-lg hover:text-white hover:bg-red"
          onClick={erasePasswordAll}
        >
          전체삭제
        </button>
        <button
          aria-label="비밀번호 한 글자 삭제"
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
