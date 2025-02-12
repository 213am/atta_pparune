import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { roleAtom } from "../atoms/roleAtom";
import { STORE, USER } from "../constants/Role";

const IndexPage = () => {
  const navigate = useNavigate();
  const [role, setRole] = useRecoilState(roleAtom);

  return (
    <div className="relative min-h-dvh bg-[url('/startingPage.png')] bg-cover bg-center flex flex-col justify-evenly items-center">
      <div className="w-full h-1/3 flex flex-col justify-center items-center">
        <span className="w-4/5 h-full text-primary font-bold text-3xl pl-6 tracking-wide sm:w-2/3 sm:text-4xl lg:text-5xl drop-shadow-[1px_2px_1px_rgba(0,0,0,0.8)] italic">
          예약부터 결제까지
        </span>
        <img
          src="/logo.png"
          alt=""
          className="w-4/5 h-full sm:w-2/3 lg:w-3/4 drop-shadow-[1px_2px_1px_rgba(0,0,0,0.8)]"
        />
      </div>
      <div>
        <div className="flex flex-col items-center w-full gap-8 mx-auto top-80 tb:w-1/2 lg:w-1/3">
          <button
            className={
              "px-6 py-2 text-xl font-bold tracking-widest text-white transition duration-200 bg-primary shadow-lg text-nowrap sm:text-2xl sm:px-6 sm:py-1.5 lg:text-3xl lg:px-8 lg:py-2  rounded-xl hover:bg-primaryFocus"
            }
            onClick={() => {
              navigate("/user");
              setRole(USER);
            }}
          >
            사용자
          </button>
          <button
            className={
              "px-6 py-2 text-xl font-bold tracking-widest text-white transition duration-200 bg-primary shadow-lg text-nowrap sm:text-2xl sm:px-6 sm:py-1.5 lg:text-3xl lg:px-8 lg:py-2 rounded-xl hover:bg-primaryFocus "
            }
            onClick={() => {
              navigate("/auth");
              setRole(STORE);
            }}
          >
            매장관리자
          </button>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
