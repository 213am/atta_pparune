import axios from "axios";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { LuArrowDownUp } from "react-icons/lu";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import DOMPurify from "dompurify";
import "swiper/swiper-bundle.css";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { isClickIcon, isWhiteIcon } from "../../atoms/noticeAtom";
import { loginAtom } from "../../atoms/userAtom";
import MenuBar from "../../components/MenuBar";
import Notification from "../../components/notification/NotificationIcon";
import { DOCKER_URL, STORE_IMAGE_URL } from "../../constants/url";
import { getCookie } from "../../components/cookie";

interface IRestaurantList {
  avgRestaurant: number;
  restaurantAddress: string;
  restaurantAroundPicList: {
    filePath: string;
  };
  restaurantId: number;
  restaurantName: string;
  avgRating: number;
}

interface ISwiperData {
  restaurantDescription: string;
  restaurantId: number;
  restaurantName: string;
  restaurantPic: {
    filePath: string;
    picId: number;
    restaurantId: number;
  };
}

const UserMainPage = (): JSX.Element => {
  const [restaurantList, setRestaurantList] = useState<IRestaurantList[]>([]);
  const [_pagenation, setPagenation] = useState<number>(1);
  const [categoryId, setCategoryId] = useState<number>(1);
  const [filter, setFilter] = useState<null | number>(null);
  const [swiperData, setSwiperData] = useState<ISwiperData[]>([]);
  const navigate = useNavigate();
  const [_isWhite, setIsWhite] = useRecoilState(isWhiteIcon);
  const [_isLogin, setIsLogin] = useRecoilState(loginAtom);
  const [_isClick, setIsClick] = useRecoilState(isClickIcon);

  useEffect(() => {
    setIsWhite(true);

    const isLoginHandler = () => {
      const userId = sessionStorage.getItem("userId");
      const accessToken = getCookie();
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
    const getSwiperList = async () => {
      try {
        const res = await axios.get("/api/restaurant/v3/main/recommend");
        console.log("스와이퍼 데이터", res.data.resultData);
        const result = res.data.resultData;
        setSwiperData([...result]);
      } catch (error) {
        console.log(error);
      }
    };
    getSwiperList();
  }, []);

  const getRestaurantList = async (page: number) => {
    const params = {
      categoryId: categoryId,
      page: page,
      filterType: filter,
      size: 20,
    };

    console.log("쿼리 값 : ", params);

    try {
      const res = await axios.get("/api/restaurant/main", { params });
      const result = res.data.resultData;

      setRestaurantList(prevList =>
        page === 1 ? result : [...prevList, ...result],
      );
    } catch (error) {
      console.error("Error fetching restaurant list:", error);
    }
  };

  useEffect(() => {
    setPagenation(1);
    getRestaurantList(1);
  }, [categoryId, filter]);

  useEffect(() => {
    if (inView) {
      setPagenation(prev => {
        const nextPage = prev + 1;
        getRestaurantList(nextPage);
        return nextPage;
      });
    }
  }, [inView]);

  const detailNavigateHandler = (e: IRestaurantList) => {
    setIsClick(false);
    navigate(`/user/restaurant/detail/${e.restaurantId}`, {
      state: {
        from: "/user",
      },
    });
  };

  const filterChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    switch (e.target.value) {
      case "기본순":
        setFilter(null);
        break;
      case "별점순":
        setFilter(0);
        break;
      case "리뷰순":
        setFilter(1);
        break;
    }
  };

  console.log("목록 불러오기", restaurantList);

  return (
    <div className="relative w-full h-dvh">
      <Notification />
      <div className="flex justify-center w-full h-[40%] ">
        <Swiper
          slidesPerView={1}
          loop={true}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          modules={[Pagination, Autoplay]}
        >
          {swiperData.map((item, index) => (
            <SwiperSlide
              key={index}
              className="relative cursor-pointer"
              onClick={() => {
                setIsClick(false);
                navigate(`/user/restaurant/detail/${item.restaurantId}`);
              }}
            >
              <img
                src={`${STORE_IMAGE_URL}/${item.restaurantId}/${item.restaurantPic.filePath}`}
                alt=""
                className="w-full h-full object-cover"
              />
              <div className="absolute left-2 bottom-8 font-bold">
                <p className="w-14 px-1 py-1 rounded-lg bg-primary text-white mb-2 text-center text-xs text-nowrap ">
                  추천식당
                </p>
                <div className="flex flex-col">
                  <span className="pl-2 text-white text-2xl text-nowrap">
                    {item.restaurantName}
                  </span>
                  <span
                    className="flex flex-col w-full px-2 text-white text-2xl text-balance break-words"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(
                        String(item.restaurantDescription),
                      ),
                    }}
                  ></span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="block h-full pt-2 pb-24 bg-white">
        <h1>{inView}</h1>
        <div className="w-100% flex pl-5 pt-2 justify-between items-center">
          <form className="relative">
            <span className="absolute left-1 top-1/2 transform -translate-y-1/2 ">
              <LuArrowDownUp />
            </span>
            <select
              onChange={e => filterChangeHandler(e)}
              className="text-base tracking-wide bg-white px-6 py-1 appearance-none w-[90px] outline-none cursor-pointer"
            >
              <option value="기본순">기본순</option>
              <option value="별점순">별점순</option>
              <option value="리뷰순">리뷰순</option>
            </select>
          </form>
          <div className="flex gap-2 pr-5 text-sm h-full">
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
        <div className="w-full px-4 py-4 flex flex-wrap pb-32 gap-4">
          {restaurantList.map((data, index) => (
            <div
              className="w-[calc(50%_-_0.5rem)] pb-3 cursor-pointer"
              key={index}
              onClick={() => detailNavigateHandler(data)}
            >
              <div className="flex w-full">
                {data.restaurantAroundPicList?.filePath ? (
                  <img
                    src={`${DOCKER_URL}/pic/restaurant/${data.restaurantId}/${data.restaurantAroundPicList?.filePath}`}
                    alt="/restaurant_default.png"
                    className="w-full h-44"
                  />
                ) : (
                  <img
                    src="/restaurant_default.png"
                    className="w-full h-44 bg-cover bg-gray py-4 "
                  />
                )}
              </div>
              <div className="w-[100%] flex justify-between pt-1 gap-0.5">
                <div className="w-[70%]">
                  <p className="font-semibold truncate">
                    {data.restaurantName}
                  </p>
                  <p className="text-xs text-darkGray text-nowrap w-[90px] overflow-hidden truncate">
                    {
                      data.restaurantAddress.match(
                        /^(?:대구광역시|대구)\s*(.+)/,
                      )?.[1]
                    }
                  </p>
                </div>
                <div className="w-1/3">
                  <span className="flex w-full items-center gap-1 pl-2">
                    <FaStar className="text-yellow" />
                    <span className="tracking-wide">
                      {data.avgRating.toFixed(1)}
                    </span>
                  </span>
                  <p className="flex w-full px-2 items-center justify-end font-semibold text-sm text-primary text-nowrap">
                    약 {data.avgRestaurant}분
                  </p>
                </div>
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
