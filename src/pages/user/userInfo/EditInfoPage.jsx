import axios from "axios";
import { useEffect, useState } from "react";
import { FaCameraRetro } from "react-icons/fa";
import { IoIosArrowForward, IoMdArrowBack } from "react-icons/io";
import { MdOutlineMail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import Swal from "sweetalert2";
import { isWhiteIcon } from "../../../atoms/noticeAtom";
import { userDataAtom } from "../../../atoms/userAtom";
import MenuBar from "../../../components/MenuBar";
import { getCookie } from "../../../components/cookie";
import Notification from "../../../components/notification/NotificationIcon";
import { USER_IMAGE_URL } from "../../../constants/url";

function EditInfoPage() {
  const navigate = useNavigate();
  const [userData, setUserData] = useRecoilState(userDataAtom);
  const [isWhite, setIsWhite] = useRecoilState(isWhiteIcon);
  const [displayPhone, setDisplayPhone] = useState("");
  const [inputPhone, setInputPhone] = useState("");
  const [inputNickName, setInputNickName] = useState("");
  const [imageValue, setImageValue] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  const sessionUserId = window.sessionStorage.getItem("userId");

  useEffect(() => {
    if (userData.nickName) {
      setInputNickName(userData.nickName);
    }
    if (userData.phone) {
      const formattedPhone = userData.phone
        .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/, "$1-$2-$3")
        .replace(/(-{1,2})$/, "");
      setDisplayPhone(formattedPhone);
      const rawPhone = userData.phone.replace(/[^0-9]/g, "").slice(0, 11);
      setInputPhone(rawPhone);
    }
  }, [userData.nickName, userData.phone]);

  useEffect(() => {
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
          const pointParse = resultData.point.toLocaleString("ko-KR");

          setUserData({
            ...resultData,
            point: pointParse,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUserInfo();
  }, []);

  useEffect(() => {
    if (!imageValue) {
      setPreviewImage("");
      return;
    }
    const objectUrl = URL.createObjectURL(imageValue);
    setPreviewImage(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [imageValue]);

  const editSubmitHandler = async e => {
    e.preventDefault();

    try {
      const accessToken = getCookie();
      const params = {
        nickName: inputNickName || userData.nickName,
        phone: inputPhone || userData.phone,
      };

      const blobData = new Blob([JSON.stringify(params)], {
        type: "application/json",
      });

      const formData = new FormData();
      formData.append("req", blobData);

      if (imageValue instanceof File) {
        formData.append("userPic", imageValue);
      } else if (userData.userPic === null) {
        const defaultPic = "/profile.jpeg";
        const resPic = await fetch(defaultPic);
        const blobPic = await resPic.blob();
        const mimeType = blobPic.type;
        const fileData = new File([blobPic], "default-pic.jpg", {
          type: mimeType,
        });
        formData.append("userPic", fileData);
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
        }
      }

      const res = await axios.patch(`/api/user/v3/userInfo`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      Swal.fire({
        icon: "success",
        title: "수정이 완료되었습니다.",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/user/userInfo");
    } catch (error) {
      console.error(error);
      Swal.fire("수정 실패", "정보 수정에 실패하였습니다.", "error");
    }
  };

  const cancelSubmitHandler = () => {
    Swal.fire({
      icon: "warning",
      title: "수정이 취소되었습니다.",
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      navigate("/user/userInfo");
    });
  };

  const changeNickName = e => {
    setInputNickName(e.target.value);
  };

  const changePhoneNumber = e => {
    const initNumber = e.target.value.replace(/[^0-9]/g, "").slice(0, 11);
    const hypenPhone = initNumber
      .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/, "$1-$2-$3")
      .replace(/(-{1,2})$/, "");
    setDisplayPhone(hypenPhone);
    setInputPhone(initNumber);
  };

  const changeImgHandler = e => {
    const file = e.target.files[0];
    if (!file) return;
    setImageValue(file);
  };

  const linkToInfo = () => {
    Swal.fire({
      icon: "warning",
      title: "수정이 취소되었습니다.",
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      navigate("/user/userInfo");
    });
  };

  return (
    <div className="h-dvh overflow-x-hidden overflow-y-scroll scrollbar-hide bg-white">
      <Notification />
      <div className="absolute top-0 left-0 w-full flex justify-between items-center px-3 py-5 border-b-2 border-gray border-opacity-70 bg-white z-50">
        <span className="flex w-[10%] justify-center text-2xl cursor-pointer">
          <IoMdArrowBack onClick={linkToInfo} />
        </span>
        <span className="text-xl font-semibold tracking-wider">
          회원 정보 수정
        </span>
        <span>&emsp;</span>
      </div>
      <div className="flex flex-col h-dvh justify-around mt-24 gap-10">
        <div className="w-full h-[35%] flex flex-col items-center gap-4">
          <label htmlFor="profile">
            <div className="relative cursor-pointer">
              <img
                src={
                  previewImage
                    ? previewImage
                    : userData.userPic
                      ? `${USER_IMAGE_URL}/${userData.userId}/${userData.userPic}`
                      : "/profile.jpeg"
                }
                alt="프로필 이미지"
                className="w-32 h-32 rounded-full object-cover border border-gray shadow-lg"
              />
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
          <div className="flex items-center">
            <span className="pr-3">사용가능 포인트</span>
            <span className="font-bold text-2xl">{userData.point}</span>
          </div>
          <span className="flex items-center gap-2 px-3 py-1 border-2 border-gray rounded-xl">
            <MdOutlineMail className="text-xl" />
            {userData.email}
          </span>
          <div
            onClick={() => navigate("/user/userInfo/myreview")}
            className="flex items-center gap-1 cursor-pointer"
          >
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
                <input
                  type="text"
                  onChange={changeNickName}
                  className="flex w-48 border rounded-md px-2"
                  value={inputNickName}
                  placeholder="닉네임을 설정해주세요"
                />
              </div>
              <span>{userData.name}</span>
              <span>{userData.uid}</span>
              <span>{userData.companyName}</span>
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
          <div onClick={cancelSubmitHandler}>
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
