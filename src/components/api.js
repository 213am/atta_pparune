import axios from "axios";
import { useCookies } from "react-cookie";

/* Axios 인스턴스 생성 */
const instance = axios.create({
  /* production */
  baseURL: "http://112.222.157.156:5222",
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    "Content-type": "application/json; charset=UTF-8",
    accept: "application/json",
  },
});

/* Interceptor를 통한 Header 설정 */
instance.interceptors.request.use(config => {
  const [cookies] = useCookies("accessToken");
  const accessToken = cookies;

  config.headers.common["authorization"] = `${accessToken}`;
  return config;
});
