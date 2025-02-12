import { useNavigate } from "react-router-dom";
import MenuBar from "../../components/MenuBar";
import Notification from "../../components/notification/NotificationIcon";
import { IoMdArrowBack } from "react-icons/io";
import Swal from "sweetalert2";
import { useRecoilState } from "recoil";
import { userDataAtom } from "../../atoms/userAtom";
import { MdOutlineMail } from "react-icons/md";

function EditInfoPage() {
  const navigate = useNavigate();
  const [userData, setUserData] = useRecoilState(userDataAtom);

  const Toast = Swal.mixin({
    toast: true,
    position: "center",
    showConfirmButton: false,
    timer: 1000,
    timerProgressBar: true,
    didOpen: toast => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  const onSubmitHandler = e => {
    e.preventDefault();
    Toast.fire({
      icon: "success",
      title: "핸드폰 번호가 변경되었습니다",
    });
    navigate("/user/userInfo");
  };

  // const changeNumber = () => {};

  return (
    <div className="h-dvh overflow-x-hidden overflow-y-scroll scrollbar-hide">
      <div className="absolute w-full h-10% flex justify-between items-center px-3 py-5 border-b-2 border-gray border-opacity-70 bg-white ">
        <IoMdArrowBack className="text-3xl" onClick={() => navigate(-1)} />
        <span className="text-xl font-semibold">내 정보 수정</span>
        <div>&emsp;</div>
        <Notification />
      </div>
      <form
        className="flex flex-col h-dvh justify-around mt-16 gap-10"
        onSubmit={e => onSubmitHandler(e)}
      >
        <div className="w-full flex flex-col items-center gap-3">
          <img
            src="/profile.jpeg"
            alt="프로필 이미지"
            className="w-32 rounded-full bg-auto"
          />
          <div className="flex items-center">
            <span className="pr-3">사용가능 포인트</span>
            <span className="font-bold text-2xl">{userData.point}</span>
          </div>
          <span className="flex items-center gap-2 px-3 py-1 border-2 border-gray rounded-xl">
            <MdOutlineMail className="text-xl" />
            {userData.email}
          </span>
        </div>
        <div className="h-1/6 flex justify-center items-center">
          <div className="flex gap-5 items-center justify-center">
            <div className="flex flex-col gap-6 font-thin text-lg h-full text-darkGray">
              <span>이름</span>
              <span>아이디</span>
              <span>소속</span>
              <label htmlFor="phone">휴대폰</label>
            </div>
            <div className="flex flex-col gap-6 font-medium text-lg w-2/3 h-full">
              <span>{userData.name}</span>
              <span>{userData.uid}</span>
              <span>{userData.companyName}</span>
              <input
                type="tel"
                id="phone"
                pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
                defaultValue={userData.phone}
                autoFocus
                className="px-2 w-full"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-5 pb-32">
          <button
            type="submit"
            className="px-3 py-1 bg-primary rounded-lg text-white font-semibold text-center"
          >
            변경하기
          </button>
        </div>
      </form>
      <MenuBar />
    </div>
  );
}
export default EditInfoPage;
