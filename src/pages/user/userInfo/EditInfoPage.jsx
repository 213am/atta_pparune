import axios from "axios";
import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { FaCameraRetro } from "react-icons/fa";
import { IoIosArrowForward, IoMdArrowBack } from "react-icons/io";
import { MdOutlineMail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import Swal from "sweetalert2";
import { isWhiteIcon } from "../../../atoms/noticeAtom";
import { loginAtom, userDataAtom } from "../../../atoms/userAtom";
import MenuBar from "../../../components/MenuBar";
import {
  getCookie,
  removeCookie,
  removeCookieRefresh,
} from "../../../components/cookie";
import Notification from "../../../components/notification/NotificationIcon";
import { USER_IMAGE_URL } from "../../../constants/url";

function EditInfoPage() {
  const navigate = useNavigate();
  const [userData, setUserData] = useRecoilState(userDataAtom);
  const [isWhite, setIsWhite] = useRecoilState(isWhiteIcon);
  const [isLogin, setIsLogin] = useRecoilState(loginAtom);
  const [displayPhone, setDisplayPhone] = useState(null);
  const [inputPhone, setInputPhone] = useState(null);
  const [inputNickName, setInputNickName] = useState("");
  const [imageValue, setImageValue] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [cropImage, setCropImage] = useState(null);

  // sessionStorage에 저장된 userId 값을 가져옴
  const sessionUserId = window.sessionStorage.getItem("userId");

  useEffect(() => {
    if (!imageValue) {
      setPreviewImage("");
      return;
    }
    const objectUrl = URL.createObjectURL(imageValue);
    setPreviewImage(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [imageValue]);

  useEffect(() => {
    // 알림 아이콘 검정색
    setIsWhite(false);

    const getUserInfo = async () => {
      try {
        if (sessionUserId) {
          const params = { userId: sessionUserId };
          const accessToken = getCookie();
          const res = await axios.get(`/api/user`, {
            params,
            headers: { Authorization: `Bearer ${accessToken}` },
          });
          const resultData = res.data.resultData;
          const phoneNumber = resultData.phone;
          const pointParse = resultData.point.toLocaleString("ko-KR");

          console.log(resultData);

          setUserData({ ...resultData, phone: phoneNumber, point: pointParse });
          setDisplayPhone(
            phoneNumber
              .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/, "$1-$2-$3")
              .replace(/(-{1,2})$/, ""),
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUserInfo();
  }, []);

  const logoutHandler = () => {
    removeCookie();
    removeCookieRefresh();
    window.sessionStorage.removeItem("userId");
    setIsLogin(false);

    Swal.fire({
      title: "로그아웃 되었습니다.",
      icon: "success",
      confirmButtonText: "확인",
      showConfirmButton: true,
      allowOutsideClick: false,
    }).then(result => {
      if (result.isConfirmed) {
        navigate("/user");
      }
    });
  };

  const editSubmitHandler = async e => {
    e.preventDefault();

    try {
      const accessToken = getCookie();
      const params = {
        nickName: inputNickName || userData.nickName,
        phone: inputPhone || userData.phone,
      };

      console.log(params);

      const blobData = new Blob([JSON.stringify(params)], {
        type: "application/json",
      });
      console.log(imageValue);

      const formData = new FormData();
      formData.append("req", blobData);
      if (imageValue instanceof File) {
        formData.append("userPic", imageValue);
      } else {
        const prevPic = `${USER_IMAGE_URL}/${userData.userId}/${userData.userPic}`;
        try {
          const resPic = await fetch(prevPic);
          const blobPic = await resPic.blob();
          const mimeType = blobPic.type;
          const fileData = new File([blobPic], "prev-pic.jpg", {
            type: mimeType,
          });

          formData.append("userPic", fileData);
        } catch (error) {
          console.error("Failed to fetch previous image:", error);
          formData.append("userPicUrl", prevPic);
        }
      }

      const res = await axios.patch(`/api/user/v3/userInfo`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(res.data);

      Swal.fire({
        icon: "success",
        title: "수정이 완료되었습니다.",
        showConfirmButton: false,
        timer: 1500,
      });
      setUserData({ ...userData });
      navigate("/user/userInfo");
    } catch (error) {
      console.error(error);
      Swal.fire("수정 실패", "정보 수정에 실패하였습니다.", "error");
    }
  };

  const cancleSubmitHandler = () => {
    Swal.fire({
      icon: "warning",
      title: "수정이 취소되었습니다.",
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      navigate("/user/userInfo");
    });
  };

  const debouncedChange = useCallback(
    debounce(value => {
      console.log("delayInput : ", value);
      setInputNickName(value);
    }, 500),
    [],
  );

  const changeNickName = e => {
    debouncedChange(e.target.value);
  };

  useEffect(() => {
    return () => {
      debouncedChange.cancel();
    };
  }, [debouncedChange]);

  const changePhoneNumber = e => {
    const initNumber = e.target.value.replace(/[^0-9]/g, "");

    const ruleNumber = initNumber.slice(0, 11);

    const hypenPhone = ruleNumber
      .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/, "$1-$2-$3")
      .replace(/(-{1,2})$/, "");

    setDisplayPhone(hypenPhone);
    setInputPhone(ruleNumber);
  };

  const changeImgHandler = e => {
    const file = e.target.files[0];
    if (!file) return;

    console.log(file);

    setImageValue(file);
    const objectUrl = URL.createObjectURL(file);
    setPreviewImage(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  };

  return (
    <div className="h-dvh overflow-x-hidden overflow-y-scroll scrollbar-hide bg-white">
      <Notification />
      <div className="absolute top-0 left-0 w-full flex justify-between items-center px-3 py-5 border-b-2 border-gray border-opacity-70 bg-white">
        <IoMdArrowBack
          className="text-3xl cursor-pointer"
          onClick={() => navigate("/user")}
        />
        <span className="text-xl font-semibold ">회원 정보 수정</span>
        <span>&emsp;</span>
      </div>
      <div className="flex flex-col h-dvh justify-around mt-24 gap-10">
        <div className="w-full h-[30%] flex flex-col items-center gap-4">
          <label htmlFor="profile">
            <div className="relative cursor-pointer">
              {previewImage ? (
                <img
                  src={`${previewImage}`}
                  alt="프로필 이미지"
                  className="w-32 h-32 rounded-full object-cover border border-gray shadow-lg"
                />
              ) : (
                <img
                  src={
                    userData.userPic
                      ? `${USER_IMAGE_URL}/${userData.userId}/${userData.userPic}`
                      : "/profile.jpeg"
                  }
                  alt="프로필 이미지"
                  className="w-32 h-32 rounded-full object-cover border border-gray shadow-lg"
                />
              )}
              <div className="absolute bottom-0 -right-1 text-xl bg-darkGray p-2 rounded-full border-4 border-white">
                <FaCameraRetro className="text-white" />
              </div>
            </div>
          </label>
          <input
            id="profile"
            type="file"
            className="absolute left-[5000px] hidden"
            onChange={changeImgHandler}
          />
          <div className="flex items-center ">
            <span className="pr-3">사용가능 포인트</span>
            <span className="font-bold text-2xl">{userData.point}</span>
          </div>
          <span className="flex items-center gap-2 px-3 py-1 border-2 border-gray rounded-xl ">
            <MdOutlineMail className="text-xl" />
            {userData.email}
          </span>
          <div className="flex items-center gap-1 cursor-pointer">
            <span className="text-lg font-semibold">내가 작성한 리뷰</span>
            <IoIosArrowForward className="text-xl font-semibold" />
          </div>
        </div>
        <div className="h-[40%] flex justify-center items-center">
          <div className="flex w-1/2 gap-5 items-center">
            <div className="flex flex-col w-[20%] gap-6 font-thin text-lg h-full text-darkGray text-nowrap">
              <span>닉네임</span>
              <span>이름</span>
              <span>아이디</span>
              <span>소속</span>
              <span>휴대폰</span>
            </div>
            <div className="flex flex-col w-[80%] gap-6 font-medium text-lg h-full text-nowrap">
              <div className="flex items-center gap-2 cursor-pointer">
                {userData.nickName ? (
                  <input
                    type="text"
                    onChange={changeNickName}
                    className="flex w-48 border rounded-md px-2"
                    defaultValue={userData.nickName}
                  />
                ) : (
                  <input
                    type="text"
                    placeholder={
                      userData?.nickName
                        ? userData.nickName
                        : "닉네임을 설정해주세요"
                    }
                    onChange={changeNickName}
                    className="flex w-48 border rounded-md px-2"
                  />
                )}
              </div>
              <span className="">{userData.name}</span>
              <span className="">{userData.uid}</span>
              <span className="">{userData.companyName}</span>
              <div className="flex items-center gap-2 cursor-pointer">
                <input
                  type="tel"
                  value={displayPhone}
                  onChange={changePhoneNumber}
                  className="flex w-48 border rounded-md px-2"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex h-[20%] justify-center gap-5 mb-32">
          <div onClick={editSubmitHandler}>
            <span className="flex px-3 py-1 bg-primary rounded-lg text-white font-semibold text-center cursor-pointer">
              수정 완료
            </span>
          </div>
          <div onClick={cancleSubmitHandler}>
            <span className="flex px-3 py-1 bg-darkGray rounded-lg text-white font-semibold text-center cursor-pointer">
              취소하기
            </span>
          </div>
        </div>
      </div>
      <MenuBar />
    </div>
  );
}

export default EditInfoPage;
