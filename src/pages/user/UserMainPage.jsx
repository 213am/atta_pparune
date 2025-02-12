import axios from "axios";
import { useEffect, useState } from "react";
import { LuArrowDownUp } from "react-icons/lu";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { isWhiteIcon, noticeState } from "../../atoms/noticeAtom";
import MenuBar from "../../components/MenuBar";
import Notification from "../../components/notification/NotificationIcon";
import { loginAtom } from "../../atoms/userAtom";
import { getCookie } from "../../components/cookie";

const UserMainPage = () => {
  const [restaurantList, setRestaurantList] = useState([]);
  const [pagenation, setPagenation] = useState(1);
  const [categoryId, setCategoryId] = useState(1);
  const navigate = useNavigate();
  const [isWhite, setIsWhite] = useRecoilState(isWhiteIcon);
  const [isLogin, setIsLogin] = useRecoilState(loginAtom);
  // 알림 아이콘 흰색

  useEffect(() => {
    setIsWhite(true);

    const isLoginHandler = () => {
      const userId = sessionStorage.getItem("userId");
      const accessToken = getCookie("accessToken");
      if (userId && accessToken) {
        setIsLogin(true);
      }
    };
    isLoginHandler();
  }, []);

  const { ref, inView } = useInView({
    threshold: 0.7, // 화면의 70%가 보일 때 감지
  });

  useEffect(() => {
    setPagenation(1);
    const getRestaurantList = async () => {
      const params = {
        categoryId: categoryId,
        page: pagenation,
        size: 20,
      };
      try {
        const res = await axios.get("/api/restaurant/main", { params });
        const result = res.data.resultData;

        setRestaurantList([...result]);
      } catch (error) {
        console.log(error);
      }
    };
    getRestaurantList();
  }, [categoryId]);

  useEffect(() => {
    if (inView === true) {
      console.log("inView true : ", inView);
      setPagenation(prev => prev + 1);
      const getRestaurantList = async () => {
        const params = {
          categoryId: categoryId,
          page: pagenation,
          size: 20,
        };
        try {
          const res = await axios.get("/api/restaurant/main", { params });
          const result = res.data.resultData;

          setRestaurantList([...restaurantList, ...result]);
        } catch (error) {
          console.log(error);
        }
      };
      getRestaurantList();
    } else {
      console.log("inView false : ", inView);
    }
  }, [inView]);

  const detailNavigateHandler = e => {
    navigate(`/user/restaurant/detail/${e.restaurantId}`, {
      state: {
        restaurantId: e.restaurantId,
      },
    });
  };

  return (
    <div className="w-full h-dvh overflow-x-hidden overflow-y-scroll scrollbar-hide">
      <Notification />
      <div className="flex justify-center w-full h-[40%] sm:h-[50%]">
        <Swiper
          slidesPerView={1}
          // spaceBetween={30}
          loop={true}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          modules={[Pagination, Autoplay]}
          className="mySwiper"
        >
          {/* Swiper 1 */}
          <SwiperSlide
            className="relative cursor-pointer"
            onClick={() => navigate("/user/restaurant/detail/1")}
          >
            <img src="/swiper1.jpg" alt="" />
            <div className="absolute left-2 bottom-8 font-bold">
              <p className="w-14 px-1 py-1 rounded-lg bg-primary text-white mb-2 text-center text-xs text-nowrap sm:w-24 sm:text-2xl">
                추천식당
              </p>
              <div className="flex flex-col sm:gap-2">
                <span className="pl-2 text-white text-2xl text-nowrap sm:w-24 sm:text-3xl">
                  여기 진짜 맛있어요!
                </span>
                <span className="pl-2 text-white text-2xl text-nowrap sm:w-24 sm:text-3xl">
                  호불호 없을 누구나 좋아하는 맛
                </span>
              </div>
            </div>
          </SwiperSlide>
          {/* Swiper 2 */}
          <SwiperSlide
            className="relative cursor-pointer"
            onClick={() => navigate("/user/restaurant/detail/14")}
          >
            <img src="/swiper2.jpg" alt="" />
            <div className="absolute left-2 bottom-8 font-bold">
              <p className="w-14 px-1 py-1 rounded-lg bg-primary text-white mb-2 text-center text-xs text-nowrap sm:w-24 sm:text-2xl">
                추천식당
              </p>
              <div className="flex flex-col sm:gap-2">
                <span className="pl-2 text-white text-2xl text-nowrap sm:w-24 sm:text-3xl">
                  여기 가성비 최고 식당이에요!
                </span>
                <span className="pl-2 text-white text-2xl text-nowrap sm:w-24 sm:text-3xl">
                  집밥이 생각날 때 꼭 한번 올만한 곳
                </span>
              </div>
            </div>
          </SwiperSlide>
          {/* Swiper 3 */}
          <SwiperSlide
            className="relative cursor-pointer"
            onClick={() => navigate("/user/restaurant/detail/11")}
          >
            <img src="/swiper3.jpg" alt="" />
            <div className="absolute left-2 bottom-8 font-bold">
              <p className="w-14 px-1 py-1 rounded-lg bg-primary text-white mb-2 text-center text-xs text-nowrap sm:w-24 sm:text-2xl">
                추천식당
              </p>
              <div className="flex flex-col sm:gap-2">
                <span className="pl-2 text-white text-2xl text-nowrap sm:w-24 sm:text-3xl">
                  분위기 맛집!
                </span>
                <span className="pl-2 text-white text-2xl text-nowrap sm:w-24 sm:text-3xl">
                  특별한 날에 오기 좋은 곳
                </span>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="pt-2 pb-24">
        <h1>{inView}</h1>
        <div className="w-100% flex pl-5 pt-2 justify-between">
          <div className="flex items-center gap-1">
            <LuArrowDownUp />
            <p className="text-sm">기본순</p>
          </div>
          <div className="flex gap-2 pr-5 text-sm">
            <p
              className={`text-white px-2 py-0.5 rounded-lg font-bold cursor-pointer ${categoryId === 1 ? "bg-primary" : "bg-darkGray"}`}
              onClick={() => {
                setCategoryId(1);
                setPagenation(1);
              }}
            >
              한식
            </p>
            <p
              className={`text-white px-2 py-0.5 rounded-lg font-bold cursor-pointer ${categoryId === 2 ? "bg-primary" : "bg-darkGray"}`}
              onClick={() => {
                setCategoryId(2);
                setPagenation(1);
              }}
            >
              중식
            </p>
            <p
              className={`text-white px-2 py-0.5 rounded-lg font-bold cursor-pointer ${categoryId === 3 ? "bg-primary" : "bg-darkGray"}`}
              onClick={() => {
                setCategoryId(3);
                setPagenation(1);
              }}
            >
              일식
            </p>
          </div>
        </div>
        <div className="w-full px-4 py-4 flex flex-wrap justify-between">
          {restaurantList.map((data, index) => (
            <div
              className="w-[calc(50%_-_0.5rem)] pb-3 cursor-pointer"
              key={index}
              onClick={() => detailNavigateHandler(data)}
            >
              <div className="flex w-full">
                {data.restaurantAroundPicList?.filePath ? (
                  <img
                    src={`http://112.222.157.156:5222/pic/restaurant/${data.restaurantId}/${data.restaurantAroundPicList?.filePath}`}
                    alt="/restaurant_default.png"
                    className="w-full h-44 sm:h-72 lg:h-80 tb:h-96"
                  />
                ) : (
                  <img
                    src="/restaurant_default.png"
                    className="w-full h-44 bg-cover bg-gray py-4 sm:h-96"
                  />
                )}
              </div>
              <div className="w-[100%] flex justify-between pt-1 gap-0.5">
                <div className="w-[70%]">
                  <p className="font-semibold truncate">
                    {data.restaurantName}
                  </p>
                  <p className="text-xs text-darkGray text-nowrap">
                    {
                      data.restaurantAddress.match(
                        /^(?:대구광역시|대구)\s*(.+)/,
                      )?.[1]
                    }
                  </p>
                </div>
                <p className="w-[30%] font-bold text-base text-primary text-nowrap">
                  약 {data.avgRestaurant}분
                </p>
              </div>
            </div>
          ))}
          <div ref={ref}></div>
        </div>
      </div>
      <MenuBar />
    </div>
  );
};
export default UserMainPage;
