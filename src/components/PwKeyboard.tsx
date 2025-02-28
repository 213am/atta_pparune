import { useCallback, useState } from "react";

const PwKeyboard = () => {
  const PASSWORD_MAX_LENGTH = 8;
  const nums_init = Array.from({ length: 10 }, (_, k) => k);
  const [nums, setNums] = useState(nums_init);
  const [password, setPassword] = useState("");

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

  const onClickSubmitButton = () => {
    if (password.length === 0) {
      alert("비밀번호를 입력 후 눌러주세요!");
    } else {
      alert(password + "을 입력하셨습니다.");
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <input
        className="bg-inherit text-2xl text-center text-darkGray border-b-2 border-white w-40 p-2"
        type="password"
        value={password}
        readOnly
      />
      <div className="flex flex-wrap w-96 h-80 justify-between items-center mt-6">
        {nums.map((n, i) => (
          <button
            key={i}
            className="w-1/3 h-1/4 border flex items-center justify-center text-2xl font-fantasy transition-all duration-300 ease-in-out hover:shadow-lg hover:text-white hover:bg-slate-600"
            onClick={shuffleNums(n)}
          >
            {n}
          </button>
        ))}
        <button
          className="w-1/3 h-1/4 border flex items-center justify-center text-2xl font-fantasy transition-all duration-300 ease-in-out hover:shadow-lg hover:text-white hover:bg-red"
          onClick={erasePasswordAll}
        >
          초기화
        </button>
        <button
          className="w-1/3 h-1/4 border flex items-center justify-center text-2xl font-fantasy transition-all duration-300 ease-in-out hover:shadow-lg hover:text-white hover:bg-slate-600"
          onClick={erasePasswordOne}
        >
          ←
        </button>
      </div>
      <button
        type="submit"
        className="mt-6 px-6 py-3 bg-gray-800 text-black font-fantasy rounded-lg transition-all duration-300 ease-in-out hover:bg-slate-600 hover:text-white hover:shadow-lg"
        onClick={onClickSubmitButton}
      >
        확인
      </button>
    </div>
  );
};

export default PwKeyboard;
