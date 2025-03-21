import axios from "axios";
import Swal from "sweetalert2";
import styles from "./getAlert.module.css";

const Toast = Swal.mixin({
  toast: true,
  position: "top",
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true,
  customClass: {
    popup: styles.customToastWidth,
  },
  didOpen: toast => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});

export const getAlert = async ({
  sessionId,
  accessToken,
  isLogin,
  setIsNotice,
}) => {
  const params = {
    userId: sessionId,
  };
  if (isLogin === true) {
    try {
      const res = await axios.get(`/api/user/alert`, {
        params,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log("사용자 알림 데이터 : ", res.data.resultData);
      const result = res.data.resultData;

      setIsNotice([...result]);
      if (result.length !== 0) {
        Toast.fire({
          icon: "info",
          title: "새로운 알림이 도착했어요",
        });
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    setIsNotice([]);
  }
};
